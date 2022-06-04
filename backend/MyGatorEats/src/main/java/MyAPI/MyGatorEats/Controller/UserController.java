package MyAPI.MyGatorEats.Controller;

import MyAPI.MyGatorEats.Model.User;
import MyAPI.MyGatorEats.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
public class UserController {
    @Autowired
    private UserRepo ur;

    @RequestMapping(method = RequestMethod.POST, value = "/api/user/register")
    public Map<String, Object> userRegister(@RequestBody Map<String, String> info)
    {
        Map<String, Object> m = new HashMap<>();
        if(!ur.findByEmail(info.get("email")).isEmpty())
            m.put("message", "Email existed!");
        else
        {
            User user = new User();
            user.setFirstName(info.get("firstName"));
            user.setLastName(info.get("lastName"));
            user.setEmail(info.get("email"));
            user.setPassword(PasswordHandler.SHA256(info.get("password")));
            ur.save(user);
            m.put("message", "ok");
        }

        return m;
    }
    @RequestMapping(method = RequestMethod.POST, value = "/api/user/login")
    public Map<String, Object> userLogin(@RequestBody Map<String, String> info)
    {
        Map<String, Object> m = new HashMap<>();
        List<User> l = ur.findByEmail(info.get("email"));
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

    @RequestMapping(method = RequestMethod.POST, value = "/api/user/profile")
    public Map<String, Object> userProfile(@RequestBody Map<String, String> info)
    {
        Map<String, Object> m = new HashMap<>();
        System.out.println("++++:    " + info.get("email"));
        User u = ur.findByEmail(info.get("email")).get(0);
        System.out.println(u);
        m.put("firstname", u.getFirstName());
        m.put("lastname", u.getLastName());
        m.put("email", u.getEmail());
        m.put("address", u.getAddress());
        m.put("city", u.getCity());
        m.put("state", u.getState());
        m.put("zipcode", u.getZipcode());
//        m.put("id", u.getId());
        return m;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/api/user/updateprofile")
    public void updateUserProfile(@RequestBody Map<String, String> info)
    {

        String id = info.get("id");
        User u = ur.getById(Integer.parseInt(id));
        u.setFirstName(info.get("firstname"));
        u.setLastName(info.get("lastname"));
        u.setAddress(info.get("address"));
        u.setCity(info.get("city"));
        u.setState(info.get("state"));
        u.setZipcode(info.get("zipcode"));
        ur.save(u);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/api/user/changeemail")
    public Map<String, Object> updateUserEmail(@RequestBody Map<String, String> info)
    {
        Map<String, Object> m = new HashMap<>();
        System.out.println("info: " + info);
        String id = info.get("id");
        if(ur.findByEmail(info.get("email")).isEmpty())
        {
            User u = ur.getById(Integer.parseInt(id));
            u.setEmail(info.get("email"));
            ur.save(u);
            m.put("message", "ok");
        }
        else
        {
            m.put("message", "new email already been used!");
        }
        return m;
    }
    @RequestMapping(method = RequestMethod.POST, value = "/api/user/changepassword")
    public Map<String, Object> updateUserPassword(@RequestBody Map<String, String> info)
    {
        Map<String, Object> m = new HashMap<>();
        System.out.println("info: " + info);
        String id = info.get("id");
        User u = ur.getById(Integer.parseInt(id));
        if(u.getPassword().equals(PasswordHandler.SHA256(info.get("oldPassword"))))
        {
            u.setPassword(PasswordHandler.SHA256(info.get("newPassword")));
            ur.save(u);
            m.put("message", "ok");
        }
        else
        {
            m.put("message", "old password incorrect!");
        }
        return m;
    }

}
