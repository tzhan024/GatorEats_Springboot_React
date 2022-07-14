package MyAPI.MyGatorEats;

import MyAPI.MyGatorEats.Controller.PasswordHandler;
import MyAPI.MyGatorEats.Model.Cart;
import MyAPI.MyGatorEats.Model.Payment;

import MyAPI.MyGatorEats.Model.User;
import MyAPI.MyGatorEats.Repository.CartRepo;
import MyAPI.MyGatorEats.Repository.PaymentRepo;

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
	private PaymentRepo pr;
	public static void main(String[] args) {
		SpringApplication.run(MyGatorEatsApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception
	{

//		System.out.println(PasswordHandler.MD5("1"));
//		System.out.println(PasswordHandler.MD5("2"));
		return;
	}

}
