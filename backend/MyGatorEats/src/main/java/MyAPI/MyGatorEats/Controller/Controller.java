package MyAPI.MyGatorEats.Controller;


import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class Controller {
    @RequestMapping("/")
    public String index()
    {
        return "hello there33333";
    }
    @RequestMapping(value = "/map")
    public String ind()
    {
        return "hello from map";
    }

//    @CrossOrigin(origins = "http://localhost:8080")
//    @RequestMapping(method = RequestMethod.POST, value = "/api/register")
//    public Map<String, Object> userRegister(@RequestBody Map<String, Object> info)
//    {
//        System.out.println(info);
//        Map<String, Object> m = new HashMap<>();
//        m.put("message", "ok");
//        return m;
//    }
}
