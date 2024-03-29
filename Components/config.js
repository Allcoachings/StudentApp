export const screenMobileWidth = 600;
export const appName = "All Coachings";
export const appName_Caps = "ALL COACHINGS";
export const logoName = require('../assets/logoName.png')
export const appLogo = require("../assets/Slide_icons/logo.png");
export const downloadIcon = require("../assets/downloadIcon.png");
export const appLogoName = require("../assets/logo_for_app.png");
export const theme = {
    primaryColor: "#fff",
    secondaryColor: "#000000",
    appBackgroundColor: "#fff",
    accentColor: "#13b989",
    btn_dark_background_color: "#3c4952",
    labelOrInactiveColor: '#D3D3D3',
    silverColor: '#A9A9A9',
    greyColor: '#3c4952',
    addMoreButtonColor: '#00CED1',
    textColor: '#808080',
    correctAnsColor: '#44b97d',
    redColor: '#FF0000',
    yellowColor: '#FFFF00',
    darkYellowColor: '#FFC30B',
    blueColor: '#1E90FF',
    selectedOptColor: '#2db7e1',
    violetColor: '#2c003f',
    featureYesColor: "#07BD80",
    featureNoColor: '#FF0000',
    gradientColor: '#90EE90',
    lightGreenColor: '#ABE098',
    purpleColor: '#f4ebf9',
    darkPurpleColor: '#7859c5',
    buttonColor: '#ff4f5e',
    resultScreen: {
        sectionBackground: '#eefff9',
        correctColor: '#0bdac0',
        wrongColor: '#f8c0c3',
        skippedColor: '#cbc9ca'

    },

    transparentColor: "#FFFFFF00",
    translucentColor: "#00000E5"
}



//paytm config 
export const paytmConfig = {
    mid: 'CyetnE81614660519794',
    isStaging: true,
    callbackurl: 'https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=123',
    restrictAppInvoke: true
}

//online serverBaseUrl
export const serverBaseUrl = "http://api.allcoaching.in/";
//local server base url
// export const serverBaseUrl="http://192.168.1.33:8080/"; 
// export const allcoachingAdminUrl="http://3.110.215.40:3000/"; 
export const shareTextInstitute = "Text here";
export const shareTextFeed = "Text here";
export const shareTextResult = "Text here";

export const shareBaseUrl = "https://allcoaching.in/"
export const serverApiUrl = serverBaseUrl + "api/v1/"
export const videoDefaultThumbnail = "https://i.stack.imgur.com/PtbGQ.png";
export const addBannerImagePlaceholder = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgVFhYZGRgaGRocGRoaHRkaGhgcHBwZGhoYGhgcIS4lHB4rIRoYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMBgYGEAYGEDEdFh0xMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAADBAACAQcIBQb/xABHEAABAgMEBwcCAgcGBAcAAAABAAIDBBESITFRBSIyQWFxgQYHExSRobHB0XLwI0JSgpLC4SQzYqKy8Qiz0tMXNERjc3TD/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANqJiU39PqreVGZVXamF9c+CBkrzWuRjMk7giCVGZQSVwKM/A8kBxsXC+uax45N1BfcgAmpTA81PKjMqjnWLhfW+9AxEwPIpBHEcm6gvu9VkywzKC0rs9fsiRdk8ku5xbcL996gjl11BfcgCm5XZ6rHlRmVVz7OqL96A0fZKRRxGLrs1fyozKC0tsjqsx9k/neguiFtwvWBFLtU3V/3QBTksatHX5KEZcZlY8Utuph9b0BpjZPT5SaOIhdcbqq/lRmUBIGyFSa2eqGYpbqjcstfa1TcgXT0HZHJD8qMyhujEao3XICzWz1SiM1xdceauJUZlAsomvKjMqICeM3NLzBtUs30xogEJiTGPRAFsJ2RTvjNzVyvNCBiY1qWb+SG2Ga4FGlMCjPwPJBjxm5oEYWjVt925LpuUwPNABjCCCQaVTIitzGKvEwPIrzyEB4wtGovFKXKkNhBBINEeVGr1+yJF2TyQTxm5peM0uNReEBOSuz1QAhtIIJFAmvGbmpH2SkEBozSTUCoVGNIIJwTEG9v5zWYw1Sfzigy2I3MIEVpJJAqEFPS+yOvyUC8FpaakUCZ8ZuarM7J6fKSQFiNJJIFQrQWlpqRQI8vshVmtnqgv4ozShaSSQKqidhDVHJACECDU3XURxFbmqTI1ev3SiB/xm5qJBRA94LcvlBjatLN1cfyVfzIyPt91V+vhuz4oBCM7P4TXgty+UDy7uCJ5kZH2+6CkbVpZur+d6o2K43V+Fd4t3jdmsCXIvuuQH8FuXygRTZNG3D85onmRkfb7qjm27xuuvQUbFcSATcTQpnwW5fKAIBF5pdf6LExpCHDY573BjWirnOLWtaMySaBBaK4tNG3ClfzVVZEJIBNxxWse1Pe7AYSyUYYzhdbfVsMG+8N2n/5ea1ppjtzPzBNqYexv7EM+G0cNShcPxEoOk57SEtBvjRoUP8b2s/1ELxJnt5o9hoJyFT/CS/3aCuY7RrWt+ayRvHUZf0QdMQO32j3GhnIdN9q033c0L2pLS0pHuhTEGIcmRGuPoHVXJrW7zh88AsE1/OCDr6K4tNAaBYhvJIBNQVy9ojtfOyxHhTDw0U1XG2yg3WHVA6UWxuzXfA2rWzkKz/7kKpbvvdDJqOYJ5INx+C3L5QIjyCQDQBB0fpiDHYIkF4iMODmkEcjfceBvRnQy42hgc/RBIbi40JqEfwW5fKA2GWmpwGSJ5kZH2+6AUR5BIBoAswnFxo68LLoRcbQwKjWFpqcOCA3gty+Uu+IQSAbgi+ZGR9vuhugl14pQ3oMwXFxo68I3gty+UFjC288rlfzIyPt90F/Bbl8qKnmRkfb7qIFUxKb+n1TFkZJeb3dfogZK81ZBXoWRkgBKYFGfgeSXmsQgsN45oMJqUwPNGsjJfK9uu1EOQhWzR0R4IhQ60LnDecmioqeIGJCA3bLtbA0fCtxTae4EQ4TSLbzhX/C0b3H3NAeeu0/ayYnnWor6MBqyE25jOn6zuJqbzgLl5ultKRZmK6NGeXvcbycANzQNzRuCQQRRRfV9m+wc7O2XMh2IZwiRKtaRde0UtOHEAjig+URGjfu+eAW8tE9y0s0AzEeJEdkwNhs5Gtpx51C9z/w40Yw0EqHXfrPiu+XoOcX33j0y5cENdJHu70a8gGVaPwviNPqHrytK9zMnEBMCJFgu3AkRGD911Hf5kGglF9v2l7tZ2UtODRHhj9eFUuAzdD2h0qBmviEHraB0/MSUTxJd5abrQxa8Dc9uBGPEVuIXQPYLt1B0gyx/dzDRV0InEftwz+s3hiN91CeaEeVmXw3texxa9pBa5poQRvBQdfzOyenyk18l3b9s2z7AyJRsyxtXtwD24eI0ZVpUbiciF97ZGSCsDZCpNbPVLx9oq0ttIAp+DsjkrWRkkYu0eaBmZ2ev3SaNLbXRN2Rkg85RejZGSiBbzJyCgFvG6n1QvDdkfRFgGzWt3NBby3FV80cgil4zSghuyPogO0W7zdRQy9L64XqS91a3c0V0RtDeECGkNKsgQ3xohDYcNpc45AZDedwG8kLmPtZ2hiT8w+PEuBuY3cxgJstHrUneSSth99enyLEiw0rSJF/kYfQuI/CtQILONfziiS8B8R7WMaXPcQ1rWipcTcAAMSgrffdh2I8rDEzGafMPbVoI/uWEbNDg8jHLDOoD7B910OCGxpsNiRsRDxhw+Ywe7nqg4VpVbKEGgrlu5KQnUFDdfvRHOBBFRU7kHidqO0jZKWfMObasgBra0tPdc1td1+J3AFc+6Y7eT8w8vdMxIeTITnQ2gZANNT+8SeK2b34NIkYVQR/aWf8ALirRSD6LR3bSfgvD2zUVxH6r3uiNPAteSPqt+9iO1on5YRrIa9psRGitGuABqK/qkEEdRuXMC3N3E1MOaAqaPhH1bE+wQbcEO1rVovhu3PdvAnGuiwqQpnEOAoyIcojRvP7YFc60ovu4LwBQmh4qRXgggGv1Qck6T0dEl4joMZhY9poWn2IOBBxBFxSQK6Q7ddjWz8E0bSOwEw30oTv8Nx/ZPsb81ztNS7obixwIc0kEG4ggkEEHAgggjcQUB9EaUiS0ZkxCdZex1Qdx3FpG9pFQRkV072b7RMnJdkwwCjxrNrex4ue08j6ih3rlNbI7nNPmDMmVcf0cfZ/wxWi6n4hVvEhqDfQg2tauKjmWdYXq8JwDQCaFYjEOFBeeCCnmTkFkQbWtXG9B8N2R9E1DeAACaGiATmWNYX7lhs0TuWY7qigv4D+iCIbsj6IDeZOQWEPw3ZH0UQeglJrEdfoh+O7P2CJCFqtq+mG74QBrXH/degAheXbl7lLeO7P2CAk3iEvbDdYmgF5OQF5KZhC1W1fTp8L53vFmRA0bNPFamHYFCa1iEQ647rdeiDnTtLpUzU1GmDX9JEc5tdzcGN6NDR0XlKKIPue6js8JudDnisKBZe4HBzq/o2nhUF3EMI3ro8mq+A7oNDiDo1sQij4znRDyBsMHKjbX7y+pn9LQ5dtuNFZDbgC9zWgnIVxPAIHJka3T7qsLaHNeI3tto43unINfxbuih7baMF4m4Vd2sUHznfz/AOQhf/aZ/wAqMtArcXe52mlpqThw4MwyI4TDXFrcQ0Q4oLsMKuHqtOoIt1/8P2zOfig/EVaUW0O57tHLybZoR4zYdswrNoE2rIiWqUBwqPVBu6ZxKrLbQ/O5fPDvA0Wb3TbK8n/Rqq7vA0WLxNsru1Yh/lQfYLRXfb2eEOOycYNWLqRBuERrah37zQerCd62tojtLLzNfAmGRCLyGkWgMywgOA40S/bvRImtHTDKVfYL2Z2oes0DibNn95By6jysw6G9kRpo5jmuacnNILT6gICiDrDRmkGzEGHMN2YjGOAytNBLehqOifltrovh+5eaEXRoYQawosRmO40iDpr06L7yK0NFW3H85oGF58Y6x5rLozs/hHhwQQCRecUA5Qa3Q/ROpaK0NFW3HDP5QfHdn7BA+okPHdn7BRBbyzuCsw2NrflwTaVnN3X6ILeZbxQvLO4IQXpIFWGzc7fkvge+udA0bZFdePDZ6B7/AORfezeIWtu+phMgym6ZYT/BGHyQg0Ortbv3fPAKNG84fm4KPdXluGSDqzs6GwpKXh36kvDaejG1Pyuau0+nYk7MPjPJoSQxpN0NldVoG67HM1K6U0abcCGR+tCZTqwU+Vyq9haSCCCDQg3EEYgjcUA1FFEBNrn8/wBUNRE2ufz/AFQDRAKXnoPqVAKY47h9SqEoISsKKIG9Hzr4ERsWE4tew1a4Yg/UbiDcQSF1ToPSLY8tBiltPFhMeW4gW2hxbyvouS11H2ShFsjKtIIcJeDUG4jUaaEbig5mnZew97B+o5zTXHVcRX2Sqf0zErMxnDfFiEdXuKUIreOo+o4INzdwk3SHNsNaNfCd/G14/kC2y94cLIx4rTfcSw0nDuJgAdPGr8j1W4Jba6IJ5Z3BFEYAUNai5MLz420eaAz3WrhjjeqeWdwWZXa6fZOIEvLO4KJ1RB51o5o8sK1rfgp5Xj7KHU416YID2BkEhU5pjzJyU8rx9kElRUGt6+S73JS3oyMQL2OhvuxoHtDj0aXHovrSbF2NUlpiCJiBFlyLosNzK5WmloPQmvRByi51rnlny4/KAixoRY5zXAhzSWuBxBBoR0IWNr8Xz/VB073dzojaMlnDFsIQzmDDqz+UHqvi+2ndh5iK6PKvYx7zaex9Qxzji9rmglpN5IpSpxCU7jdPU8WSccT4kOvINiAejDT8S3B5Xj7INBM7np9wqHS/8b/+hWPc5pACtuX/AI3/APQt9F9i7Hf+fRTx7WrTG5BzV2l7BzMjBEaM6EWl4bqOcTUhxFxaLtUr5cCl56D6lb877YNnR7Tj/aIf+mItAEoL1tfi+f6r3+ynZCPpDxPBdDb4di14jnN27VKUaf2D7L5xbi7hGWjOVOAl+v8AfIPHZ3NT5FfElv44n/bUd3MT4FTFlf44v/aW+DEs6uKx4trVpSv+6DUXZnukEOI2JORGPDTUQoYcWOIwtvcAS3Ntm/PPamkp0QJaLHNKQ4b3fwgkD2ATXlePstcd9OnfBlGyjTrx3CuYhsIcTwq6yOItINCEoguv9B9eSgFLz0H15KhKDffcVK0k40QjbjkDiGsZeOFXOHRbImBRt2a+a7AyRlZCWhFtHWLb64h0QmIQeVqnRfRiJa1cEC9TmnYTRZF25C8rx9ljx7OrTC5BeZFG3XXpWpzR7du7Des+V4+yBepzUTHlePsogN4gzHqgzGtSl+OF6XTEpv6fVAEMOR9Cm2xmnePUKPckWoGJi8il/K9Ca01Fx9EeUwKM/A8kHOXe9oPy886I0fo5geI0jC1hEbztUd++F8GulO33Zzz0o6G2nis14R/xgXt5OFW8yDuXN8RhaS0gggkEEUIIuIIOBQN6I0nEl48OPDID2ODhkaYgjIioPAldS9ndPQpyXZHhOFHi9pOsxw2mO4g+ooRcQuS19h2F7TRJCKKAvhxKW4QIvH7YJua8DDMY7kHSEcVNRfduvVIbCCCQaVQtCz0OPCESE4OaTcRuN1WuGIcN4KfiHVPJBrzvvcDo4UIP6eH/AKXrntdGd52inzOj4jWAl7HNiADEhtbQA3myXGnBc5oItxf8P7gDO1NLoH/7LTq3b3J6JfDgRph4IEZzAwHe1lqrhwJeR+6UG0ozSXVAqOF6xBBDgSCBmUxLbI6oWkplkOG58RzWMaKuc40AFRiUFZ+fhwYb4r3AMY0uceAyzO4DeSuX+1/aB09NvmHCgJssb+wxuy3nvO4klfV9uu2RmzYZVss01bUXxThbe0kat7tTIg44a6jxLTi6+8770Ayar6PsHoPzs7CgkVYHW4tcPDZQuB/Fc3m4L5tb+7qezJlZbxojaRo9HEHFsMXtacialx5gbkGwIrCSSBdwwVoIoam4cbkeX2QqzWz1QX8QZj1SkRhJJAJvQ07CvaOSAMAUNTddvuTHiDMeqFMjV6/dKhA/4gzHqokFEDvgN/JQIxs7N1feiKZhvFDe23huQUbFdn7BM+A3L3QBAOSN5hvFBSKbOzvVBGcbqq8QWr27lQQHC/JAfwG5e6033wdiKF09LtOFZhgv4eMB/q/i/aK3H5hvFCiNt3gXYGqDj9PNilpbEbfZADud4oemB4LZfeH3YOhl8zJsrDvc+C28s3l0Mb2f4cRuqLhqqHFLTdyIOBGRCD67QvaePKETDHWLQoIdbTIn/wAjd/A4ipvvWzezXevKzFGTH9niG42r4ZxweBq/vAUriVoSLFLjU8gBgBkAqAVQdgSxhvaHsc17Tg5jg4HkQaFfI6b7vNHx4he6BYebyYbnMBJxJaNWvGl653ktIRYJrBixIbjiWOcw3YXtIXuwe3+kmigm4h/EGPPq5pKDcch3Z6NY8O8Fz6bnvc5vVtQDyNy+3MBjG7mtaM7LWgewAXM7+8LSR/8AVPH4WsafVrQvE0hpeYj/AN9HixaGo8R7305BxNEG/e0feZJytWwn+YibmwyCwG/ai7IHK0RktTdou2MzPPrHeGsaSWw2/wB2BS6oxc7i68ioFK0Px8N9k1RpmYLzU8KmgBJpSp/NyCsaLW4VsjCuJ3VPH4QFFsXu/wC7eJOFseYBZLYgYPjcG72tzdv3ZgC91PYnzUVszHZ/Z4btQHCM9vyxpF+4m6/WW/PAb+SlZWWEJrWtaGMYA1rW0AaAKAADAJnzDeKAT4haaDAKQ3FxocFHQy42hgVljC01OCAvl25JcxSDQHBH8w3igvglxqMCgtDcXGjudEUS7ckKGwtNThgieYbxQZ8BuXuoseYbxUQKJiU39Pqj2BkPRLzN1KXY4XIGivNVg85lPWBkPRAGVwKM/A8kvM3EUu5XILHGovOKCqblMDzRbAyHol5m4il1265AxEwPIrXHbDu5l5wuiQ6QI5vLmj9G8467BvP7QvvvqvumONRecQnbAyHog5V7Qdk5uSJ8eEQytBEbrQ3ZawwPA0PBeAuv5to2aXEXjcccRvXxulO7jR8w6phGE4/rQTY/y0LP8qDnba5/P9fnniNbmn+5C8mDN3bmxGX9Xtd/KvDmu5+eBoIku7jbeCeJBZj1Qa1VwN56DP8Aothwe5+ecQC+XHN7/pDK9uS7knkgxptozDGF1eAc5wp6INPkr1dC9n5icdZl4T30NHOAoxv4nnVb1K3jo7uvkJdwLob47hfWK6rcP2WBrSODgV9nJQWsoxjWtYLg1oDWgUwDRcEGuOyPdbBly2LNFseILxDp+iaeIN8Q86DgcVtOX2R+d6vYGQ9EpGNHEC7/AGQMTGyenykkaCakA3801YGQ9EFZfZCrNbPVAjOIcaFZgGrr7+aAKfg7I5LNgZD0ScRxBNDvQMTOz1+6TR5c1N9929M2BkPRB56i9CwMh6KIAea4e6m3wp1xQLByPojyxpWt2GNyCeV4+39VPNcPdHtjMeqRsHI+iA9Ld+FOqx5el9cL8P6rMsaA1u53Ir3ihvGGaAXmuHusWbd+FLs0Gwcj6JiXNAa3X77kFfAs31wvwyWfNcPdFe8UN4wKTsHI+iA1m3rYbs/zip4FnWrWl+CvLmgvuv33K0RwIIBGCAfmuHusWLWtWm6mKFYOR9ExAcAKG6/fcgr4NnWrWnBTzXD3V4jgWkAgpWwcj6IDeHa1q04YqeFZ1q1puw4K8BwDaE05rMZwLSAanggp5rh7rHhWtatK7seCDYOR9E1BcA0Amh480A/Ds61a03YLPmuHurxnAtIBqeCVsHI+iA3g2tatKrNizrVr7K8JwDQCQFiO4FtAa8kFfNcPdY8C1rVpW/BBsHI+ibhOAABIwQCsWNbHdks+a4e6tMOqKC+/delrByPogP5rh7rCDYOR9FEHopWc3dfoqeO5WZrbW5ABq9JL+Wbx9UETDkF5vEILMRzCPDFq925X8BovvuQHSk3iOSp5hyJDbavdyQBh7Q5hegl3QQBUYi/0QTMHNBabx6fdCgHWHNFa21eccFcwQ0V3i9Aykpra6LHmHIsNgcKnFACBtBegl3wg0VGIQfMOQSZ2j0WJfaH53IzGBwtHFR8MAVG5AykZjaPT4WDFcEaHDDhaOKAUvtDqnks+GGioxQvMOQYj7RVpba6IjIQcKnEqPYGioxQMrz420eat5hyKIYIqcSgFLG/p9k6Eo9lkVGOCr45zQPKJHzDlEE8u7L4V4WrW1dXBNpWc3dfogsY7fyEHy7svhDavSQKwjZ2t6uY7TchzeIQWYjmEF/Luy+ESE6zc7mmkpN4jkgu+M0gjO5LeC7L3CjBeOY+U+AgXhENFHY4qzooIIGJQ5ra6fdDhbQ5oLeXdl8IsN4aKOxTKSmtrogK6KHCgxKD5d2XwqwNoL0EC0N4aLJxWHRA4WRicEOZxKxAGsPzuQZ8F2X2RYcQNFk4hMAJGZ2j0+EBojw4WRiheXdl8KS+0OqeQLsihoocQsRHhwo3FBj7RVpba6IKuguy90RkQAUOIxTLhVIxRrHmgM9wcLLccUPy7svhWldrp9k4gR8u7L4UTyiCJWc3dfooogXC9JRRApN4hBZiOYUUQeilJvEclhRAOHtDmF6CiiBOa2un3Q4W0OaiiD0ElM7XRRRBSBtBegoogRmcSsS+0PzuUUQPpCZ2j0+FFEGZfaHVPKKIEI+0VaW2uiiiB1efG2jzUUQEldrp9k4oogiiiiD//2Q=="
export const documentPlaceholder = "data:image/png;base64,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";
export const defaultStudentImage = "https://dubuddy.in/userAvatar";
export const dataLimit = 25;
export const linkingPrefixes = ['https://www.allcoaching.in', "https://allcoaching.in", "allcoaching://", "http://*.allcoaching.in"]
//   201- create update     
//   200 - success (fetch)
//   400-bad request 404-notfound  500-hota hai


export const Assets = {
    noResult:
    {
        noRes1: require('../assets/noresult1.png'),
    },
    resultScreen:
    {
        percentileIcon: require('../assets/speedometer.png'),
        accuracy: require('../assets/accurate.png'),
        timeTaken: require('../assets/clock.png'),
    },
    profile:
    {
        profileIcon: require('../assets/profile.png'),
        downloadIcon: require('../assets/cloud-computing.png'),
        helpNsupport: require('../assets/customer-service.png'),
        enrollment: require('../assets/enrollment.png'),
        notifications: require('../assets/notifications.png'),
        people: require('../assets/people.png'),
        recents: require('../assets/recent.png'),
        settings: require('../assets/settings.png'),
        policy: require('../assets/privacy.png'),
        about: require('../assets/about.png'),
        refund: require('../assets/refund.png'),
        contact: require('../assets/call.png'),

    },
    examCategory: {
        top: require('../assets/top.png'),
        otherCategory: require('../assets/category.jpeg'),
        selectCategory: require('../assets/select.jpg')
    },
    header:
    {
        back: require('../assets/back.png'),
        backWhite: require('../assets/backArrowWhite.png'),
        reply: require('../assets/reply.png'),
        search: require('../assets/search.png')
    },
    instituteView:
    {
        ringing: require('../assets/ringing.png'),
        bell: require('../assets/bell.png')
    },
    video:
    {
        chat: require('../assets/chatWhite.png'),
        settings: require('../assets/settingWhite.png')
    }
}


export const imageProvider = (url) => {
    if (url && (url?.startsWith('files/'))) {
        return serverBaseUrl + url;
    } else {
        if (url?.uri) {

            return url.uri
        }
    }

    return url;
}


export const numFormatter = (num) => {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    } else if (num <= 999) {
        return num; // if value < 1000, nothing to do
    }
    return num;
}