package MyAPI.MyGatorEats.Repository;

import MyAPI.MyGatorEats.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Integer> {
}
