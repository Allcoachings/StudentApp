package com.allcoaching.AllCoachingRestApi.Controller;

import com.allcoaching.AllCoachingRestApi.Entity.Transaction;
import com.allcoaching.AllCoachingRestApi.Service.TransactionService;
import com.allcoaching.AllCoachingRestApi.Utils.RandomString;
import com.allcoaching.AllCoachingRestApi.dto.TransactionDto;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/transaction/")
@Api(value = "admin",description = "Transaction Controller for admin to manage transaction")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @CrossOrigin(origins = "*")
    @PostMapping("/")
    public ResponseEntity<Object> saveTransaction(@RequestBody Transaction transaction)
    {
        long transCount = transactionService.countTransactions();
        String orderId =transCount+""+RandomString.getAlphaNumericString(6);
        transaction.setOrderId(orderId);
        Transaction transaction_saved  = transactionService.addTransaction(transaction);
        URI location = ServletUriComponentsBuilder.fromPath("{id}").buildAndExpand(transaction_saved.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("bycourseId/{id}/{page}/{pageSize}")
    public Iterable<Transaction> findByCourseIdWithStudentDetailSuccess(@PathVariable long id,@PathVariable int page,@PathVariable int pageSize)
    {
         return transactionService.findByCourseIdWithStudentDetailSuccess(id,page,pageSize);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("all/{offset}/{pageLimit}")
    public Iterable<TransactionDto> findAllTransactions(@PathVariable int offset, @PathVariable int pageLimit)
    {
        return transactionService.fetchAllTransaction(offset,pageLimit);

    }
    @CrossOrigin(origins = "*")
    @GetMapping("allSuccess/{offset}/{pageLimit}")
    public Iterable<TransactionDto> findAllSuccessTransactions(@PathVariable int offset, @PathVariable int pageLimit)
    {
        return transactionService.fetchAllTransaction(offset,pageLimit);

    }

    @CrossOrigin(origins = "*")
    @GetMapping("allTransactionsByStudentName/{offset}/{pageLimit}")
    public Iterable<TransactionDto> findAllTransactionsByStudentName(@RequestParam String name,@PathVariable int offset, @PathVariable int pageLimit)
    {
        return transactionService.findAllTransactionsByStudentName(name,offset,pageLimit);

    }

    @CrossOrigin(origins = "*")
    @PutMapping("updateTransactionSeenStatus")
    public ResponseEntity<Object> updateTransactionSeenStatus(@RequestParam(name = "transactionId") long transactionId,@RequestParam(name = "status") boolean status)
    {
        transactionService.updateTransactionStatus(transactionId,status);
        return ResponseEntity.ok().build();

    }

    @CrossOrigin(origins = "*")
    @PutMapping("updateTransactionSeenStatusForIns")
    public ResponseEntity<Object> updateTransactionSeenStatusForIns(@RequestParam(name = "transactionId") long transactionId,@RequestParam(name = "status") boolean status)
    {
        transactionService.updateTransactionStatusForIns(transactionId,status);
        return ResponseEntity.ok().build();

    }
    @CrossOrigin(origins = "*")
    @GetMapping("byinsId/{insId}/{offset}/{pageLimit}")
    public Iterable<TransactionDto> fetchByInsId(@PathVariable long insId,@PathVariable int offset, @PathVariable int pageLimit)
    {
        return transactionService.fetchByInsId(insId,offset,pageLimit);

    }

    @CrossOrigin(origins = "*")
    @GetMapping("byinsIdAnsStatusSuccess/{insId}/{offset}/{pageLimit}")
    public Iterable<TransactionDto> fetchByInsIdAnsStatusSuccess(@PathVariable long insId,@PathVariable int offset, @PathVariable int pageLimit)
    {
        return transactionService.fetchByInsIdAndStatusSuccess(insId,offset,pageLimit);

    }

    @CrossOrigin(origins = "*")
    @GetMapping("getTodayIncomeSumIns/{insId}")
    public long getTodayIncomeSumIns(@PathVariable long insId)
    {
        return transactionService.todayIncomeSumIns(insId);

    }

    @CrossOrigin(origins = "*")
    @GetMapping("getCurrentMonthIncomeIns/{insId}")
    public long getCurrentMonthIncomeIns(@PathVariable long insId)
    {
        return transactionService.currentMonthIncomeSumIns(insId);

    }

    @CrossOrigin(origins = "*")
    @GetMapping("getTotalIncomeIns/{insId}")
    public long getTotalIncomeIns(@PathVariable long insId)
    {
        return transactionService.totalIncomeSumIns(insId);

    }

    @CrossOrigin(origins = "*")
    @GetMapping("UnSeenTransactionCount/")
    public long unseenTransactionCount()
    {
        return transactionService.getAdminUnSeenTransactionCount();

    }

    @CrossOrigin(origins = "*")
    @GetMapping("UnSeenTransactionCountForIns")
    public long unseenTransactionCountForIns(@RequestParam(name = "insId")long insId)
    {
        return transactionService.getAdminUnSeenTransactionCountForIns(insId);

    }


}
