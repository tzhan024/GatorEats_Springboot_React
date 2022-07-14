package MyAPI.MyGatorEats.Repository;

import MyAPI.MyGatorEats.Model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepo extends JpaRepository<Order, Integer> {


    @Query("SELECT o FROM Order o WHERE o.userid = ?1")
    List<Order> findByUser(Integer user);

    @Query("SELECT o FROM Order o WHERE o.userid = ?1 and o.status = ?2")
    List<Order> findByUserAndStatus(Integer user, String status);

    @Query("SELECT o FROM Order o WHERE o.restaurantid = ?1 and o.status = ?2")
    List<Order> findByRestaurantAndStatus(Integer restaurant, String status);

    @Query("SELECT o FROM Order o WHERE o.restaurantid = ?1")
    List<Order> findByRestaurant(Integer restaurant);

//    @Query("SELECT p FROM Payment p WHERE p.id = ?1")
//    List<Payment> findById(Integer id);


}

