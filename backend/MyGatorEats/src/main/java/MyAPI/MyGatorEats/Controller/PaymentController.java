package MyAPI.MyGatorEats.Controller;

import MyAPI.MyGatorEats.Model.Menu;
import MyAPI.MyGatorEats.Model.Payment;
import MyAPI.MyGatorEats.Repository.PaymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class PaymentController {
    @Autowired
    private PaymentRepo pr;


    @RequestMapping(method = RequestMethod.GET, value = "/api/payment/getpayment/{userid}")
    public List<Payment> getPayment(@PathVariable String userid)
    {
//        Map<String, Object> m = new HashMap<>();

        System.out.println(userid);
//        List<Payment> l = pr.findByUser(Integer.parseInt(userid));
//        for(Payment p : l)
//        {
//            System.out.println(p.getId());
//        }

        return pr.findByUser(Integer.parseInt(userid));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/payment/getbyid/{id}")
    public Map<String, Object> getPaymentById(@PathVariable String id)
    {
        Map<String, Object> m = new HashMap<>();

//        System.out.println(id);
        Payment p = pr.getById(Integer.parseInt(id));
        m.put("name", p.getName());
        m.put("number", p.getNumber());
        m.put("expdate", p.getExpdate());
        m.put("cvv", p.getScode());

        return m;
    }
    @RequestMapping(method = RequestMethod.POST, value = "/api/payment/addpayment")
    public void addPayment(@RequestBody Map<String, String> info)
    {
        System.out.println(info);
        Payment p = new Payment();
        p.setUserid(Integer.parseInt(info.get("userid")));
        p.setName(info.get("name"));
        p.setNumber(info.get("number"));
        p.setExpdate(info.get("expdate"));
        p.setScode(info.get("cvv"));
        pr.save(p);
    }
    @RequestMapping(method = RequestMethod.POST, value = "/api/payment/editpayment")
    public void editPayment(@RequestBody Map<String, String> info)
    {

        System.out.println(info);
        String id = info.get("id");
        Payment p = pr.getById(Integer.parseInt(id));

//        p.setUserid(Integer.parseInt(info.get("user")));
        p.setName(info.get("name"));
        p.setNumber(info.get("number"));
        p.setExpdate(info.get("expdate"));
        p.setScode(info.get("cvv"));
        pr.save(p);
    }
    @RequestMapping(method = RequestMethod.GET, value = "/api/payment/delete/{id}")
    public void deleteFood(@PathVariable String id)
    {


        Payment p = pr.getById(Integer.parseInt(id));

//        System.out.println("1: " + m);
        pr.delete(p);
    }
}
