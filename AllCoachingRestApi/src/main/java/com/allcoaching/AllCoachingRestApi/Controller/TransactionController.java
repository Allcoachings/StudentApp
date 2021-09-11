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


}
