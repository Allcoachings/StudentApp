package com.allcoaching.AllCoachingRestApi.Service;

import com.allcoaching.AllCoachingRestApi.Entity.Institute;
import com.allcoaching.AllCoachingRestApi.Entity.Otp;
import com.allcoaching.AllCoachingRestApi.Entity.Student;
import com.allcoaching.AllCoachingRestApi.Entity.StudentMessage;
import com.allcoaching.AllCoachingRestApi.Respository.InstituteRepo;
import com.allcoaching.AllCoachingRestApi.Utils.EmailTemplates;
import com.allcoaching.AllCoachingRestApi.Utils.MD5;
import com.allcoaching.AllCoachingRestApi.Utils.Mailer;
import com.allcoaching.AllCoachingRestApi.Utils.RandomString;
import com.allcoaching.AllCoachingRestApi.dto.InsAccountDto;
import com.allcoaching.AllCoachingRestApi.dto.InsCredentialDto;
import org.springframework.core.env.Environment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.apache.commons.codec.digest.DigestUtils.md5;

@Service
public class InstituteService {
    @Autowired
    private InstituteRepo instituteRepo;
    @Autowired
    private OtpService otpService;
    @Autowired
    private Mailer mailer;

    @Autowired
    private Environment env;

    public  Iterable<Institute> getAllInstitute(Integer pageNo,Integer pageSize,String sortBy)
    {

        Pageable paging  = PageRequest.of(pageNo,pageSize, Sort.by(Sort.Direction.DESC,"addDate"));
        Page<Institute> pagedResult = instituteRepo.findAll(paging);
        if(pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<Institute>();
        }
    }
    public  Iterable<Institute> getAllInstituteByStatus(Integer status,Integer pageNo,Integer pageSize,String sortBy)
    {

        Pageable paging  = PageRequest.of(pageNo,pageSize, Sort.by(Sort.Direction.DESC,"addDate"));
        Page<Institute> pagedResult = instituteRepo.findByStatus(status,paging);
        if(pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<Institute>();
        }
    }

    public String forgotPassPassword(String email)
    {
            Optional<Institute> institute = instituteRepo.findByEmail(email);
            if(institute.isPresent())
            {
                Otp otp =  otpService.generateOtp(email);
                otp.setOtpHash(MD5.getMd5(otp.getOtpValue()));
                otp.setMobileNumberHash(MD5.getMd5(email));
                otpService.save(otp);
                String passwordResetRoute = env.getProperty("allcoaching.ins.resetPasswordLink").concat("/"+otp.getOtpHash()+"/"+otp.getMobileNumberHash());

                System.out.println(passwordResetRoute);
                String res = mailer.sendMail(email,"Password Reset Link", EmailTemplates.passwordResetLinkTemplate(passwordResetRoute));
                if(res.equals("ok"))
                {
                    return "200";
                }else
                {
                    return res;
                }

            }else
            {
                return  "404";
            }
    }

    public String resetPassword(String password,String mobileHash,String otpHash)
    {
            Otp otp = new Otp();
            otp.setMobileNumberHash(mobileHash);
            otp.setOtpHash(otpHash);
            if(otpService.validateOtpHash(otp))
            {

                Optional<Otp> otp1 = otpService.findByOtpHash(otpHash);
                if(otp1.isPresent())
                {

                    Otp otp2 = otp1.get();

                    Optional<Institute> instituteOptional = instituteRepo.findByEmail(otp2.getMobileNumber());
                    if(instituteOptional.isPresent())
                    {
                        Institute institute = instituteOptional.get();
                        institute.setPassword(password);
                        instituteRepo.save(institute);
                        otpService.deleteOtp(otp2);
                        return "ok";
                    }else
                    {
                        return "email didn't matched";
                    }


                }else
                {
                    return "invalidOtp";
                }

            }else
            {
                return "invalidOtp";
            }
    }




    public Optional<Institute> validateIns(InsCredentialDto insCredentialDto)
    {
        return instituteRepo.findByEmailAndPassword(insCredentialDto.getEmail(),insCredentialDto.getPassword());
         
    }
    public  Iterable<Institute> findByCategory(long id,Pageable topTwenty)
    {


        Page<Institute> pagedResult = instituteRepo.findByCategory(id,topTwenty);
        if(pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<Institute>();
        }
    }


    public  Iterable<Institute> findByCategoryAndStatus(long id,int status,Pageable topTwenty)
    {


        Page<Institute> pagedResult = instituteRepo.findByCategoryAndStatus(id,status,topTwenty);
        if(pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<Institute>();
        }
    }

    public  Iterable<String> findByCategoryAndExpoTokenNotNull(long id,Pageable topTwenty)
    {


        Page<String> pagedResult = instituteRepo.findByCategoryAndExpoTokenNotNull(id,topTwenty);
        if(pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<String>();
        }
    }
    public  Iterable<Institute> findByStatusAndCategory(long id,int status,Pageable topTwenty)
    {


        Page<Institute> pagedResult = instituteRepo.findByStatusAndCategory(status,id,topTwenty);
        if(pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<Institute>();
        }
    }
    public Optional<Institute> findById(long id)
    {
        return instituteRepo.findById(id);
    }

    public Institute save(Institute institute)
    {
        Institute institute_saved =   instituteRepo.save(institute);
        long id = institute_saved.getId();
        String name = institute.getName();
        String randomString = RandomString.getAlphaNumericString(3);
        String uniqueId = name+"_"+randomString+""+id;
        institute_saved.setUniqueUserId(uniqueId);
        return instituteRepo.save(institute_saved);
    }

    public Iterable<Institute> searchInstitute(String word,int page,int pageLimit)
    {
         Page<Institute> pagedResult = instituteRepo.findByNameContainingIgnoreCase(word,PageRequest.of(page,pageLimit));
         if(pagedResult.hasContent())
         {
             return pagedResult.getContent();
         }else
         {
             return new ArrayList<>();
         }
    }

    public Iterable<Institute> searchInstituteByEmail(String word,int page,int pageLimit)
    {
         Page<Institute> pagedResult = instituteRepo.findByEmailContainingIgnoreCase(word,PageRequest.of(page,pageLimit));
         if(pagedResult.hasContent())
         {
             return pagedResult.getContent();
         }else
         {
             return new ArrayList<>();
         }
    }



    public  void updateStatus(int status, long id)
    {
            instituteRepo.updateStatus(status,id);
    }

    public  void updateInstituteStreamingKey(String streamKey, long id)
    {
            instituteRepo.updateInstituteStreamingKey(streamKey,id);
    }


    public void deleteIns(long id)
    {
        instituteRepo.deleteById(id);
    }


    public void boostIns(long id,int value)
    {
        instituteRepo.boostIns(id,value);
    }

    //update institute bank details
    public void updateInstituteBankDetails(InsAccountDto insAccountDto)
    {
        instituteRepo.updateInstituteAccountDetails(insAccountDto.getAccountNumber(),insAccountDto.getIfsc(),insAccountDto.getAccountHolderName(),insAccountDto.getBankName(),insAccountDto.getUpi(),insAccountDto.getInsId());

    }

    //fetch institute bank details by ins id
    public InsAccountDto fetchAccountDetailsByInsId(long id)
    {

        Optional<Institute> i = instituteRepo.findById(id);
        if(i.isPresent())
        {
            Institute institute = i.get();
            return  new InsAccountDto(institute.getId(),institute.getAccountNumber(),institute.getIfsc(),institute.getAccountHolderName(),institute.getBankName(),institute.getUpi());
        }else
        {
            return null;
        }

    }
    public List<String> getExpoTokenOfInsEnrolledInCategory(long categoryId)
    {
        return instituteRepo.getExpoTokenOfInsEnrolledInCategory(categoryId);
    }



    public  String getExpoTokenOfIns(long id,String  email)
    {
        return instituteRepo.getExpoTokenOfIns(id,email);
    }

    public Page<String> getExpoTokenOfAllIns(int page,int pageSize)
    {
        return instituteRepo.getExpoTokenOfAllIns(PageRequest.of(page,pageSize));
    }


    public void updatePushToken(long id,String token)
    {
        instituteRepo.updatePushToken(id,token);
    }

    public Optional<Institute> findByEmail(String email)
    {
       return instituteRepo.findByEmail(email);
    }


}
