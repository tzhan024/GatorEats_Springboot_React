package MyAPI.MyGatorEats.Controller;

import MyAPI.MyGatorEats.Model.Menu;
import MyAPI.MyGatorEats.Model.Restaurant;
import MyAPI.MyGatorEats.Model.User;
import MyAPI.MyGatorEats.Repository.MenuRepo;
import MyAPI.MyGatorEats.Repository.RestaurantRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class MenuController {
    @Autowired
    private MenuRepo mr;
    @Autowired
    private RestaurantRepo rr;

    @RequestMapping(method = RequestMethod.POST, value = "/api/menu/addfood")
    public void addFood(@RequestBody Map<String, String> info)
    {
        System.out.println(info);
        Menu m = new Menu();
        m.setRestaurant(Integer.parseInt(info.get("restaurant")));
        m.setImage(info.get("image"));
        m.setName(info.get("name"));
        m.setPrice(Double.parseDouble(info.get("price")));
        mr.save(m);
    }
    @RequestMapping(method = RequestMethod.GET, value = "/api/menu/{id}")
    public Map<String, Object> searchRestaurant(@PathVariable String id)
    {
        Map<String, Object> m = new HashMap<>();


        Integer parseId = Integer.parseInt(id);
        Restaurant r = rr.getById(parseId);
        List<Menu> l = mr.findByRestaurantId(parseId);
        m.put("name", r.getName());
        m.put("image", r.getImage());
        m.put("menu", l);
        return m;

    }
    @RequestMapping(method = RequestMethod.GET, value = "/api/menu/getfood/{id}")
    public Map<String, Object> findFood(@PathVariable String id)
    {
        Map<String, Object> hm = new HashMap<>();
//        System.out.println("id:  " + id);
        Integer parseId = Integer.parseInt(id);
        Menu m = mr.getById(parseId);
//        System.out.println(mr.getById(parseId));
//        return mr.getById(parseId);
        hm.put("name", m.getName());
        hm.put("price", m.getPrice());
        hm.put("image", m.getImage());
        return hm;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/api/menu/editfood")
    public void editFood(@RequestBody Map<String, String> info)
    {

        System.out.println(info);
        String id = info.get("food");
        Menu m = mr.getById(Integer.parseInt(id));

//        System.out.println("1: " + m);
        m.setName(info.get("name"));
        m.setPrice(Double.parseDouble(info.get("price")));
        m.setImage(info.get("image"));
//        System.out.println("2: " + m);
        mr.save(m);
    }
    @RequestMapping(method = RequestMethod.GET, value = "/api/menu/delete/{id}")
    public void deleteFood(@PathVariable String id)
    {


        Menu m = mr.getById(Integer.parseInt(id));

//        System.out.println("1: " + m);
        mr.delete(m);
    }

}
