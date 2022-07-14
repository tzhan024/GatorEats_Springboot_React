package MyAPI.MyGatorEats.Repository;

import MyAPI.MyGatorEats.Model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PaymentRepo extends JpaRepository<Payment, Integer> {


    @Query("SELECT p FROM Payment p WHERE p.userid = ?1")
    List<Payment> findByUser(Integer user);

//    @Query("SELECT p FROM Payment p WHERE p.id = ?1")
//    List<Payment> findById(Integer id);


}

