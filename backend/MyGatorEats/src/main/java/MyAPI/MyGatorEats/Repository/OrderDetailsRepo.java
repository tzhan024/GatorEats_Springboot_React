package MyAPI.MyGatorEats.Repository;

import MyAPI.MyGatorEats.Model.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderDetailsRepo extends JpaRepository<OrderDetails, Integer> {


    @Query("SELECT o FROM OrderDetails o WHERE o.orderid = ?1")
    List<OrderDetails> findByOrder(Integer orderid);



//    @Query("SELECT p FROM Payment p WHERE p.id = ?1")
//    List<Payment> findById(Integer id);


}

