package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Transaction;
import com.allcoaching.AllCoachingRestApi.Respository.TransactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

    //fetch by courseId
    public Iterable<Transaction> fetchByCourseId(long courseId,int page,int pageSize)
    {
         return extractDataFromPage(transactionRepo.findByCourseId(courseId,PageRequest.of(page,pageSize)));
    }
    //fetch by insId
    public Iterable<Transaction> fetchByInsId(long insId,int page,int pageSize)
    {
         return extractDataFromPage(transactionRepo.findByInsId(insId,PageRequest.of(page,pageSize)));
    }
    //fetch by studentId
    public Iterable<Transaction> fetchByStudentId(long studentId,int page,int pageSize)
    {
         return extractDataFromPage(transactionRepo.findByInsId(studentId,PageRequest.of(page,pageSize)));
    }
    //fetch by status
    public Iterable<Transaction> fetchByStatus(String status,int page,int pageSize)
    {
         return extractDataFromPage(transactionRepo.findByStatus(status,PageRequest.of(page,pageSize)));
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

    //fetch transaction details by order id
    public Optional<Transaction> findByOrderId(String orderId)
    {
        return  transactionRepo.findByOrderId(orderId);
    }

    public  Iterable<Transaction> findByCourseId(long id,int page,int pageSize)
    {
        return transactionRepo.findByCourseId(id,PageRequest.of(page,pageSize));
    }
}
