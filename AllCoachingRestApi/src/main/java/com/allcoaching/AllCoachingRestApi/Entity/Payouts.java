package com.allcoaching.AllCoachingRestApi.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@ToString
@NoArgsConstructor
@Data
@Entity
public class Payouts {

    @Id
    @GeneratedValue
    private long id;

    @OneToOne(targetEntity = Institute.class,fetch = FetchType.EAGER,cascade = CascadeType.DETACH)
    @JoinColumn(name="insId",referencedColumnName = "id")
    private Institute institute;

    private float amount;
    private String orderId;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date payoutTime;
}

