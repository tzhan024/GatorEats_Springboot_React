package MyAPI.MyGatorEats.Repository;

import MyAPI.MyGatorEats.Model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RestaurantRepo extends JpaRepository<Restaurant, Integer> {
    @Query("SELECT r FROM Restaurant r WHERE r.email = ?1")
    List<Restaurant> findByEmail(String email);

    @Query("SELECT r FROM Restaurant r WHERE r.zipcode = ?1")
    List<Restaurant> findByZipcode(String zipcode);

//    @Modifying
//    @Query("UPDATE User u set u.firstname = ?1, u.lastname = ?2, u.address = ?3, u.city = ?4, u.state = ?5, u.zipcode = ?6 WHERE u.id = ?7")
//    void updateInfoById(String firstName, String lastName, String address, String city, String state, String zipcode, Integer id);

//    @Query()
}

