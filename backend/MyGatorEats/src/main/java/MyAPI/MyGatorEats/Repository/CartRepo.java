package MyAPI.MyGatorEats.Repository;

import MyAPI.MyGatorEats.Model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartRepo extends JpaRepository<Cart, Integer> {
    @Query("SELECT c FROM Cart c WHERE c.restaurant = ?1 and c.userid = ?2 ORDER BY c.id DESC")
    List<Cart> findByRestaurantAndUser(Integer restaurant, Integer user);

    @Query("SELECT c FROM Cart c WHERE c.food = ?1 and c.restaurant = ?3 and c.userid = ?2")
    List<Cart> findByFood(Integer food, Integer user, Integer restaurant);

    @Modifying
    @Query(value = "DELETE FROM Cart c WHERE c.restaurant = ?1 and c.userid = ?2", nativeQuery = true)
    void deleteByRestaurantAndUser(Integer restaurant, Integer user);
}
