import AllInOneSDKManager from 'paytm_allinone_react-native';


import React from 'react';
import { Text, View } from 'react-native';

const PaymentGateway = ({    orderId,
    mid,
    tranxToken,
    amount,
    callbackUrl,
    isStaging,
    appInvokeRestricted,
    callback
}) => {
    AllInOneSDKManager.startTransaction(
        orderId,
        mid,
        tranxToken,
        amount,
        callbackUrl,
        isStaging,
        appInvokeRestricted,
       )
       .then((result) => {
        callback(result);
       })
       .catch((err) => {
        handleError(err);
       })
}

export default PaymentGateway;
