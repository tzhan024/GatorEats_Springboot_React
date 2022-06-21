package MyAPI.MyGatorEats.Controller;

import MyAPI.MyGatorEats.Model.Restaurant;
import MyAPI.MyGatorEats.Repository.RestaurantRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class RestaurantController {
    @Autowired
    private RestaurantRepo rr;

    @RequestMapping(method = RequestMethod.POST, value = "/api/restaurant/register")
    public Map<String, Object> restaurantRegister(@RequestBody Map<String, String> info)
    {
        Map<String, Object> m = new HashMap<>();
        if(!rr.findByEmail(info.get("email")).isEmpty())
            m.put("message", "Email existed!");
        else
        {
            Restaurant r = new Restaurant();
            r.setName(info.get("name"));
            r.setZipcode(info.get("zipcode"));
            r.setEmail(info.get("email"));
            r.setPassword(PasswordHandler.SHA256(info.get("password")));
            rr.save(r);
            m.put("message", "ok");
        }

        return m;
    }
    @RequestMapping(method = RequestMethod.POST, value = "/api/restaurant/login")
    public Map<String, Object> restaurantLogin(@RequestBody Map<String, String> info)
    {
        Map<String, Object> m = new HashMap<>();
        List<Restaurant> l = rr.findByEmail(info.get("email"));
        if(l.isEmpty())
            m.put("message", "Email does not exist");
        else
        {
            String password = l.get(0).getPassword();

            if(PasswordHandler.SHA256(info.get("password")).equals(password))
            {
                m.put("token", UUID.randomUUID().toString());
                m.put("message", "ok");
                m.put("id", l.get(0).getId().toString());
            }
            else
            {
                m.put("message", "password incorrect!");
            }

        }

        return m;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/api/restaurant/profile")
    public Map<String, Object> restaurantProfile(@RequestBody Map<String, String> info)
    {
        Map<String, Object> m = new HashMap<>();
        System.out.println("++++:    " + info.get("email"));
        Restaurant r = rr.findByEmail(info.get("email")).get(0);
        System.out.println(r);
        m.put("name", r.getName());
        m.put("email", r.getEmail());
        m.put("address", r.getAddress());
        m.put("city", r.getCity());
        m.put("state", r.getState());
        m.put("zipcode", r.getZipcode());
        m.put("image", r.getImage());
//        m.put("id", u.getId());
        return m;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/api/restaurant/updateprofile")
    public void updateRestaurantProfile(@RequestBody Map<String, String> info)
    {

        System.out.println("info:   " + info);
        String id = info.get("id");
        Restaurant r = rr.getById(Integer.parseInt(id));
        System.out.println("r:  " + r);
        r.setName(info.get("name"));
        r.setAddress(info.get("address"));
        r.setCity(info.get("city"));
        r.setState(info.get("state"));
        r.setZipcode(info.get("zipcode"));
        rr.save(r);
    }
    @RequestMapping(method = RequestMethod.POST, value = "/api/restaurant/uploadimage")
    public void uploadImage(@RequestBody Map<String, String> info)
    {

        System.out.println("info:   " + info);
        String id = info.get("id");
        Restaurant r = rr.getById(Integer.parseInt(id));
        System.out.println("r:  " + r);
        r.setImage(info.get("image"));

        rr.save(r);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/api/restaurant/changeemail")
    public Map<String, Object> updateRestaurantEmail(@RequestBody Map<String, String> info)
    {
        Map<String, Object> m = new HashMap<>();
        System.out.println("info: " + info);
        String id = info.get("id");
        if(rr.findByEmail(info.get("email")).isEmpty())
        {
            Restaurant r = rr.getById(Integer.parseInt(id));
            r.setEmail(info.get("email"));
            rr.save(r);
            m.put("message", "ok");
        }
        else
        {
            m.put("message", "new email already been used!");
        }
        return m;
    }
    @RequestMapping(method = RequestMethod.POST, value = "/api/restaurant/changepassword")
    public Map<String, Object> updateRestaurantPassword(@RequestBody Map<String, String> info)
    {
        Map<String, Object> m = new HashMap<>();
        System.out.println("info: " + info);
        String id = info.get("id");
        Restaurant r = rr.getById(Integer.parseInt(id));
        if(r.getPassword().equals(PasswordHandler.SHA256(info.get("oldPassword"))))
        {
            r.setPassword(PasswordHandler.SHA256(info.get("newPassword")));
            rr.save(r);
            m.put("message", "ok");
        }
        else
        {
            m.put("message", "old password incorrect!");
        }
        return m;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/restaurant/search/{zipcode}")
    public List<Restaurant> searchRestaurant(@PathVariable String zipcode)
    {
//        Map<String, Object> m = new HashMap<>();

        System.out.println(zipcode);

        return rr.findByZipcode(zipcode);
    }
}
