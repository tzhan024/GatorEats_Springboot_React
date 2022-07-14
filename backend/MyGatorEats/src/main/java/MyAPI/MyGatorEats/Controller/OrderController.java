package MyAPI.MyGatorEats.Controller;

import MyAPI.MyGatorEats.Model.Cart;
import MyAPI.MyGatorEats.Model.Menu;
import MyAPI.MyGatorEats.Model.Order;
import MyAPI.MyGatorEats.Model.OrderDetails;
import MyAPI.MyGatorEats.Repository.CartRepo;
import MyAPI.MyGatorEats.Repository.MenuRepo;
import MyAPI.MyGatorEats.Repository.OrderDetailsRepo;
import MyAPI.MyGatorEats.Repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class OrderController {
    @Autowired
    private OrderRepo or;

    @Autowired
    private OrderDetailsRepo odr;
    @Autowired
    private CartRepo cr;
    @Autowired
    private MenuRepo mr;

    @RequestMapping(method = RequestMethod.GET, value = "/api/order/getbyuser/inprogress/{id}")
    public List<Order> getByUserProgress(@PathVariable String id)
    {
        return or.findByUserAndStatus(Integer.parseInt(id), "In progress");
    }
    @RequestMapping(method = RequestMethod.GET, value = "/api/order/getbyuser/delivering/{id}")
    public List<Order> getByUserDelievering(@PathVariable String id)
    {
        return or.findByUserAndStatus(Integer.parseInt(id), "On the way");
    }
    @RequestMapping(method = RequestMethod.GET, value = "/api/order/getbyuser/delivered/{id}")
    public List<Order> getByUserDelievered(@PathVariable String id)
    {
        return or.findByUserAndStatus(Integer.parseInt(id), "Delivered");
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/order/getbyrestaurant/inprogress/{id}")
    public List<Order> getByRestaurantProgress(@PathVariable String id)
    {
        return or.findByRestaurantAndStatus(Integer.parseInt(id), "In progress");
    }
    @RequestMapping(method = RequestMethod.GET, value = "/api/order/getbyrestaurant/delivering/{id}")
    public List<Order> getByRestaurantDelievering(@PathVariable String id)
    {
        return or.findByRestaurantAndStatus(Integer.parseInt(id), "On the way");
    }
    @RequestMapping(method = RequestMethod.GET, value = "/api/order/getbyrestaurant/delivered/{id}")
    public List<Order> getByRestaurantDelievered(@PathVariable String id)
    {
        return or.findByRestaurantAndStatus(Integer.parseInt(id), "Delivered");
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/order/startdelivery/{id}")
    public void startDelivery(@PathVariable String id)
    {
        Order o = or.getById(Integer.parseInt(id));
        o.setStatus("On the way");
        or.save(o);
    }
    @RequestMapping(method = RequestMethod.GET, value = "/api/order/orderdelivered/{id}")
    public void orderDelivered(@PathVariable String id)
    {
        Order o = or.getById(Integer.parseInt(id));
        o.setStatus("Delivered");
        or.save(o);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/order/details/{id}")
    public Map<String, Object> orderDetails(@PathVariable String id)
    {
        Map<String, Object> hm = new HashMap<>();
        Integer orderId = Integer.parseInt(id);
        Order o = or.getById(orderId);
        List<OrderDetails> lod = odr.findByOrder(orderId);
        hm.put("name", o.getName());
        hm.put("address", o.getAddress());
        hm.put("city", o.getCity());
        hm.put("state", o.getState());
        hm.put("zipcode", o.getZipcode());
        hm.put("holder", o.getHolder());
        hm.put("number", o.getNumber());
        hm.put("exp", o.getExp());
        hm.put("status", o.getStatus());
        hm.put("orderNumber", o.getOrdernumber());
        hm.put("date", o.getDate());
        hm.put("price", o.getPrice());
        List<Map<String, Object>> lm = new ArrayList<>();
        for(OrderDetails od : lod)
        {
            HashMap<String, Object> map = new HashMap<>();
            Menu food = mr.getById(od.getFoodid());
            map.put("image", food.getImage());
            map.put("name", food.getName());
            map.put("price", food.getPrice());
            map.put("qty", od.getQty());
            lm.add(map);
        }

        hm.put("details", lm);

        return hm;
    }



    @RequestMapping(method = RequestMethod.POST, value = "/api/order/create")
    public void createOrder(@RequestBody Map<String, String> info)
    {
        System.out.println("++");
        System.out.println(info);
        Integer user = Integer.parseInt(info.get("user"));
        Integer restaurant = Integer.parseInt(info.get("restaurant"));
        Order o = new Order();
//        String orderNumber = PasswordHandler.MD5(o.getId().toString());
        o.setUserid(user);
        o.setRestaurantid(restaurant);
        o.setOrdernumber("0");

        o.setStatus("In progress");
        o.setDate(info.get("date"));
        o.setTime(info.get("time"));
        o.setPrice(Double.parseDouble(info.get("price")));

        o.setName(info.get("name"));
        o.setAddress(info.get("address"));
        o.setCity(info.get("city"));
        o.setState(info.get("state"));
        o.setZipcode(info.get("zipcode"));

        o.setHolder(info.get("holder"));
        o.setNumber(info.get("number"));
        o.setExp(info.get("exp"));
        o.setCvv(info.get("cvv"));
        or.save(o);
        o.setOrdernumber(PasswordHandler.MD5(o.getId().toString()));
        or.save(o);

        List<Cart> lc = cr.findByRestaurantAndUser(restaurant, user);
        for(Cart c : lc)
        {
            OrderDetails od = new OrderDetails();
            od.setOrderid(o.getId());
            od.setFoodid(c.getFood());
            od.setQty(c.getQty());
            odr.save(od);
        }
        for(Cart c : lc)
        {
            cr.delete(c);
        }


        return;
    }


}
