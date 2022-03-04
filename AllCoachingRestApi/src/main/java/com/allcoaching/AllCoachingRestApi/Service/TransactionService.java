package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.Transaction;
import com.allcoaching.AllCoachingRestApi.Respository.TransactionRepo;
import com.allcoaching.AllCoachingRestApi.dto.TransactionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepo transactionRepo;


    //add transaction
    public Transaction addTransaction(Transaction transaction)
    {
        return transactionRepo.save(transaction);
    }

    //delete transaction
    public  void deleteById(long id)
    {
        transactionRepo.deleteById(id);
    }


    public Iterable<TransactionDto> fetchAllTransaction(int offset, int dataLimit)
    {
        Page<TransactionDto> pagedResult =  transactionRepo.findAllTransactions(PageRequest.of(offset,dataLimit,Sort.by(Sort.Direction.DESC,"purchaseDate")));
        if(pagedResult.hasContent())
        {
            return  pagedResult.getContent();
        }else{
            return  new ArrayList<>();
        }
    }

    public Iterable<TransactionDto> fetchAllSuccessTransaction(int offset, int dataLimit)
    {
        Page<TransactionDto> pagedResult =  transactionRepo.findAllTransactionsByStatus("TXN_SUCCESS",PageRequest.of(offset,dataLimit,Sort.by(Sort.Direction.DESC,"purchaseDate")));
        if(pagedResult.hasContent())
        {
            return  pagedResult.getContent();
        }else{
            return  new ArrayList<>();
        }
    }

    //fetch by courseId
    public Iterable<Transaction> fetchByCourseId(long courseId,int page,int pageSize)
    {
         return extractDataFromPage(transactionRepo.findByCourseId(courseId,PageRequest.of(page,pageSize,Sort.by(Sort.Direction.DESC,"purchaseDate"))));
    }

    public long todayIncomeSumIns(long insId)
    {
            return transactionRepo.todayIncomeSumIns(insId);
    }
    public long currentMonthIncomeSumIns(long insId)
    {
            return transactionRepo.currentMonthIncomeSumIns(insId);
    }
    public long totalIncomeSumIns(long insId)
    {
            return transactionRepo.totalIncomeSumIns(insId);
    }
    //fetch by insId
    public Iterable<TransactionDto> fetchByInsId(long insId,int page,int pageSize)
    {
         Page<TransactionDto> pagedResult = (transactionRepo.findByInsId(insId,PageRequest.of(page,pageSize,Sort.by(Sort.Direction.DESC,"purchaseDate"))));
        if(pagedResult.hasContent())
        {
            return  pagedResult.getContent();
        }else{
            return  new ArrayList<>();
        }
    }

    //fetch by insId and status=TXN_SUCCESS
    public Iterable<TransactionDto> fetchByInsIdAndStatusSuccess(long insId,int page,int pageSize)
    {
         Page<TransactionDto> pagedResult = (transactionRepo.findByInsIdAnsStatus(insId,"TXN_SUCCESS",PageRequest.of(page,pageSize,Sort.by(Sort.Direction.DESC,"purchaseDate"))));
        if(pagedResult.hasContent())
        {
            return  pagedResult.getContent();
        }else{
            return  new ArrayList<>();
        }
    }
    //fetch by studentId
//    public Iterable<Transaction> fetchByStudentId(long studentId,int page,int pageSize)
//    {
//         return extractDataFromPage(transactionRepo.findByInsId(studentId,PageRequest.of(page,pageSize)));
//    }
    //fetch by status
    public Iterable<Transaction> fetchByStatus(String status,int page,int pageSize)
    {
         return extractDataFromPage(transactionRepo.findByStatus(status,PageRequest.of(page,pageSize,Sort.by(Sort.Direction.DESC,"purchaseDate"))));
    }

    //count number of transactions
    public long countTransactions()
    {
        return transactionRepo.count();
    }
    public Iterable<Transaction> extractDataFromPage(Page<Transaction> transactionPage)
    {
        if(transactionPage.hasContent())
        {
            return transactionPage.getContent();
        }else
        {
            return new ArrayList<>();
        }
    }


    //update status and gatewayTransactionId for completing transaction
    public void compeleteTransaction(String status,String gatewayTxnId,String responseMsg,String orderId)
    {

            transactionRepo.completeTransaction(status,gatewayTxnId,responseMsg,orderId);
    }

    public  long getAdminUnSeenTransactionCount()
    {
        return  transactionRepo.countByIsSeenByAdminAndStatus(false,"TXN_SUCCESS");
    }
   public  long getAdminUnSeenTransactionCountForIns(long insId)
    {
        return  transactionRepo.countByInsIdAndIsSeenByInsAndStatus(insId,false,"TXN_SUCCESS");
    }


    public void updateTransactionStatus(long transactionId,boolean status)
    {
        transactionRepo.updateTransactionStatus(transactionId,status);
    }
    public void updateTransactionStatusForIns(long transactionId,boolean status)
    {
        transactionRepo.updateTransactionStatusForIns(transactionId,status);
    }

    //fetch transaction details by order id
    public Optional<Transaction> findByOrderId(String orderId)
    {
        return  transactionRepo.findByOrderId(orderId);
    }

    public  Iterable<Transaction> findByCourseIdWithStudentDetailSuccess(long id,int page,int pageSize)
    {
       Page<Transaction> paged_result = transactionRepo.findByCourseIdWithStudentDetailSuccess(id,PageRequest.of(page,pageSize, Sort.by(Sort.Direction.DESC,"purchaseDate")));
       if(paged_result.hasContent())
       {
           return paged_result.getContent();
       }else
       {
           return  new ArrayList<>();
       }
    }

    public Iterable<TransactionDto> findAllTransactionsByStudentName(String name,int page,int pageSize){
        Page<TransactionDto> paged_result =  transactionRepo.findAllTransactionsByStudentName(name,PageRequest.of(page,pageSize, Sort.by(Sort.Direction.DESC,"purchaseDate")));
        if(paged_result.hasContent())
        {
            return paged_result.getContent();
        }else
        {
            return  new ArrayList<>();
        }
    }
}
