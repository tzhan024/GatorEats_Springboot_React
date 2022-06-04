package MyAPI.MyGatorEats.Controller;

import MyAPI.MyGatorEats.Model.Cart;
import MyAPI.MyGatorEats.Model.Menu;
import MyAPI.MyGatorEats.Model.User;
import MyAPI.MyGatorEats.Repository.CartRepo;
import MyAPI.MyGatorEats.Repository.MenuRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class CartController {
    @Autowired
    private CartRepo cr;

    @Autowired
    private MenuRepo mr;

    @RequestMapping(method = RequestMethod.POST, value = "/api/cart/shoppingcart")
    public Map<String, Object> showCart(@RequestBody Map<String, String> info)
    {

//        String id = info.get("id");
//        User u = ur.getById(Integer.parseInt(id));
//        u.setFirstName(info.get("firstname"));
//        u.setLastName(info.get("lastname"));
//        u.setAddress(info.get("address"));
//        u.setCity(info.get("city"));
//        u.setState(info.get("state"));
//        u.setZipcode(info.get("zipcode"));
//        ur.save(u);
        Map<String, Object> m = new HashMap<>();
        List<Map<String, Object>> lm = new ArrayList<>();
        Integer user = Integer.parseInt(info.get("user"));
        Integer restaurant = Integer.parseInt(info.get("restaurant"));
        double total = 0;
        int totalQty = 0;
        List<Cart> lc = cr.findByRestaurantAndUser(restaurant, user);
        for(int i = 0; i < lc.size(); i++)
        {
            lm.add(new HashMap<String, Object>());
            lm.get(lm.size() - 1).put("qty", lc.get(i).getQty());
            lm.get(lm.size() - 1).put("id", lc.get(i).getId());
            Menu food = mr.getById(lc.get(i).getFood());
            lm.get(lm.size() - 1).put("food", lc.get(i).getFood());
            lm.get(lm.size() - 1).put("name", food.getName());
            lm.get(lm.size() - 1).put("price", food.getPrice());
            lm.get(lm.size() - 1).put("image", food.getImage());
            total += lc.get(i).getQty() * food.getPrice();
            totalQty += lc.get(i).getQty();
        }
        m.put("data", lm);
        m.put("total", total);
        m.put("qty", totalQty);
        return m;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/api/cart/addtocart")
    public void addToCart(@RequestBody Map<String, String> info)
    {

        System.out.println(info);
        Integer restaurant = Integer.parseInt(info.get("restaurant"));
        Integer user = Integer.parseInt(info.get("user"));
        Integer food = Integer.parseInt(info.get("food"));
        List<Cart> lc = cr.findByFood(food);
        if(!lc.isEmpty())
        {
            Cart c = lc.get(0);
            c.setQty(c.getQty() + 1);
            cr.save(c);
        }
        else
        {
            Cart c = new Cart();
            c.setRestaurant(restaurant);
            c.setUserid(user);
            c.setFood(food);
            c.setQty(1);
            cr.save(c);
        }

    }
    @RequestMapping(method = RequestMethod.POST, value = "/api/cart/changeqty")
    public void changeQty(@RequestBody Map<String, String> info)
    {

        System.out.println(info);
        Cart c = cr.getById(Integer.parseInt(info.get("id")));
        c.setQty(Integer.parseInt(info.get("qty")));
        cr.save(c);

    }
    @RequestMapping(method = RequestMethod.GET, value = "/api/cart/delete/{id}")
    public void deleteFromCart(@PathVariable String id)
    {
        Cart c = cr.getById(Integer.parseInt(id));
        cr.delete(c);
    }


}
