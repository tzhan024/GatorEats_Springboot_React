package MyAPI.MyGatorEats;

import MyAPI.MyGatorEats.Model.Cart;
import MyAPI.MyGatorEats.Model.User;
import MyAPI.MyGatorEats.Repository.CartRepo;
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
	private CartRepo cr;
	public static void main(String[] args) {
		SpringApplication.run(MyGatorEatsApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception
	{

//		Cart c = new Cart();
//		c.setRestaurant(1);
//		c.setUserid(1);
//		c.setFood(2);
//		c.setQty(1);
//		cr.save(c);
//		return;
	}

}
