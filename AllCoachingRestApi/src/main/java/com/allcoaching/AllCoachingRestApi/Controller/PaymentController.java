package com.allcoaching.AllCoachingRestApi.Controller;

import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;

import com.allcoaching.AllCoachingRestApi.Entity.Course;
import com.allcoaching.AllCoachingRestApi.Entity.InsReview;
import com.allcoaching.AllCoachingRestApi.Entity.Transaction;
import com.allcoaching.AllCoachingRestApi.Service.CourseService;
import com.allcoaching.AllCoachingRestApi.Service.InsReviewService;
import com.allcoaching.AllCoachingRestApi.Service.PayoutService;
import com.allcoaching.AllCoachingRestApi.Service.TransactionService;
import com.allcoaching.AllCoachingRestApi.Utils.PaytmGateway.PaytmDetailPojo;
import com.allcoaching.AllCoachingRestApi.Utils.RandomString;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import com.paytm.pg.merchant.PaytmChecksum;
@Controller
@Api()
public class PaymentController {

    @Autowired
    private PaytmDetailPojo paytmDetailPojo;
    @Autowired
    private Environment env;
    @Autowired
    private CourseService courseService;
    @Autowired
    private  TransactionService transactionService;
    @Autowired
    private InsReviewService insReviewService;
    @Autowired
    private PayoutService payoutService;
    @GetMapping("/checkout/course/{userId}/{courseId}/{insId}")
    public ModelAndView checkout(@PathVariable long userId,@PathVariable long courseId,@PathVariable long insId,Model model) throws  Exception
    {
        Optional<Course> course = courseService.findById(courseId);
        if(course.isPresent())
        {
            Course courseObj = course.get();
            String fees = String.valueOf(courseObj.getFees());
            long transactionCount = transactionService.countTransactions();
            String orderId =transactionCount+""+ RandomString.getAlphaNumericString(6);
            Transaction transaction = new Transaction(insId,userId,courseId,fees,orderId,"TXN_PENDING","COURSE");
            transactionService.addTransaction(transaction);
            return redirectToPaytm(String.valueOf(userId),fees,orderId);
        }
        return  null;
    }


    @PostMapping(value = "/submitPaymentDetail")
    public ModelAndView getRedirect(@RequestParam(name = "CUST_ID") String customerId,
                                    @RequestParam(name = "TXN_AMOUNT") String transactionAmount,
                                    @RequestParam(name = "ORDER_ID") String orderId) throws Exception {
            return redirectToPaytm(customerId,transactionAmount,orderId);
    }

    private ModelAndView redirectToPaytm(String customerId,String transactionAmount,String orderId) throws  Exception
    {

        ModelAndView modelAndView = new ModelAndView("redirect:" + paytmDetailPojo.getPaytmUrl());
        TreeMap<String, String> parameters = new TreeMap<>();
        paytmDetailPojo.getDetails().forEach((k, v) -> parameters.put(k, v));
        parameters.put("MOBILE_NO", env.getProperty("paytm.mobile"));
        parameters.put("EMAIL", env.getProperty("paytm.email"));
        parameters.put("ORDER_ID", orderId);
        parameters.put("TXN_AMOUNT", transactionAmount);
        parameters.put("CUST_ID", customerId);
        String checkSum = getCheckSum(parameters);
        parameters.put("CHECKSUMHASH", checkSum);
        modelAndView.addAllObjects(parameters);
        return modelAndView;
    }
    @PostMapping(value = "/pgresponse")
    public String getResponseRedirect(HttpServletRequest request, Model model) {

        Map<String, String[]> mapData = request.getParameterMap();
        TreeMap<String, String> parameters = new TreeMap<String, String>();
        String paytmChecksum = "";
        for (Entry<String, String[]> requestParamsEntry : mapData.entrySet()) {
            if ("CHECKSUMHASH".equalsIgnoreCase(requestParamsEntry.getKey())){
                paytmChecksum = requestParamsEntry.getValue()[0];
            } else {
                parameters.put(requestParamsEntry.getKey(), requestParamsEntry.getValue()[0]);
            }
        }
        String result;
        String txnStatus =  parameters.get("STATUS");
        String txnId = parameters.get("TXNID");
        String orderId = parameters.get("ORDERID");
        String gatewayResponseMsg = parameters.get("RESPMSG");
        boolean isValideChecksum = false;
        System.out.println(parameters);

        transactionService.compeleteTransaction(txnStatus,txnId,gatewayResponseMsg,orderId);
        Optional<Transaction> transaction = transactionService.findByOrderId(orderId);
        try {
            isValideChecksum = validateCheckSum(parameters, paytmChecksum);
            if (isValideChecksum && parameters.containsKey("RESPCODE")) {
                if (parameters.get("RESPCODE").equals("01")) {
                    result = "Payment Successful";



                        transaction.ifPresent(this::processPayment);



                } else {
                    result = "Payment Failed";
                }
            } else {
                result = "Checksum mismatched";
            }
        } catch (Exception e) {
            result = e.toString();
        }

        System.out.println(result);
        model.addAttribute("result",result);
        parameters.remove("CHECKSUMHASH");
        model.addAttribute("parameters",parameters);
        model.addAttribute("insId",transaction.get().getInsId());
        return "pgResponse";
    }

    private void processPayment(Transaction transactionData)
    {
            switch (transactionData.getProductType())
            {
                case "COURSE":

                    InsReview insReview  = new InsReview(transactionData.getCourseId(),transactionData.getInsId(),transactionData.getStudentId());
                    insReviewService.save(insReview);

                    break;
                    //more cases to be added here in future if any other kind of product is introduced
                default:
                    System.out.println("not product found related to : "+transactionData.getProductType());
                    break;
            }
    }
    private boolean validateCheckSum(TreeMap<String, String> parameters, String paytmChecksum) throws Exception {
        return PaytmChecksum.verifySignature(parameters,
                paytmDetailPojo.getMerchantKey(), paytmChecksum);
    }
    private String getCheckSum(TreeMap<String, String> parameters) throws Exception {
        return PaytmChecksum.generateSignature(parameters, paytmDetailPojo.getMerchantKey());
    }

}
