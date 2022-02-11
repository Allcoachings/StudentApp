package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Data
@ToString
@NoArgsConstructor
@Entity
public class Transaction {

    @Id
    @GeneratedValue
    private  long id;

    private long insId;
    private long studentId;
    private long courseId;
    private String amount;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date purchaseDate;

    private String orderId;
    private String gatewayTransactionId;
    private String gatewayResponseMsg;
    private String status;
    private String productType;//COURSE or Any other digital product of all coaching
    private boolean isSeenByAdmin;
    private boolean isSeenByIns;


    public Transaction(long insId, long studentId, long courseId, String amount, String orderId, String status,String productType) {
        this.insId = insId;
        this.studentId = studentId;
        this.courseId = courseId;
        this.amount = amount;
        this.orderId = orderId;
        this.status = status;
        this.productType = productType;
    }
}
