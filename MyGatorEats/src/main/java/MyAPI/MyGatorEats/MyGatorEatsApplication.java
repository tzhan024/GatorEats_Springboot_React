package MyAPI.MyGatorEats;

import MyAPI.MyGatorEats.Model.User;
import MyAPI.MyGatorEats.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;
//import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
public class MyGatorEatsApplication implements CommandLineRunner {

	@Autowired
	private UserRepo ur;
	public static void main(String[] args) {
		SpringApplication.run(MyGatorEatsApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception
	{
		User user = new User();

		user.setFirstName("tim");
		user.setLastName("zhang");
		user.setEmail("ooo");
		user.setPassword("uuu");
		ur.save(user);
		User user2 = new User();

		user2.setFirstName("timm");
		user2.setLastName("zhangg");
		user2.setEmail("oooo");
		user2.setPassword("uuuuu");
		ur.save(user2);
		List<User> u = ur.findAll();
		for(int i = 0; i < u.size(); i++)
		{
			System.out.println(u.get(i));
		}
		return;
	}

}
