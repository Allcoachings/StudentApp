package com.allcoaching.AllCoachingRestApi.Utils.PaytmGateway;

import java.util.Map;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;


@Component
@ConfigurationProperties("paytm.payment")
@Data
public class PaytmDetailPojo {

    private String merchantId;

    private String merchantKey;

    private String channelId;

    private String website;

    private String industryTypeId;

    private String paytmUrl;

    private Map<String, String> details;

    public PaytmDetailPojo() {}


    public PaytmDetailPojo(String merchantId, String merchantKey, String channelId, String website,
                           String industryTypeId, String paytmUrl, Map<String, String> details) {
        super();
        this.merchantId = merchantId;
        this.merchantKey = merchantKey;
        this.channelId = channelId;
        this.website = website;
        this.industryTypeId = industryTypeId;
        this.paytmUrl = paytmUrl;
        this.details = details;
    }
}