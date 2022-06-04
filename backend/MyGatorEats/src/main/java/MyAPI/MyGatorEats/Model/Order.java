//package MyAPI.MyGatorEats.Model;
//
//import org.hibernate.annotations.GenericGenerator;
//
//import javax.persistence.Id;
//
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Table;
//import java.util.Map;
//
//@Entity
//@Table(name = "orders")
//public class Order {
////    @Id
////    @GenericGenerator(name = "increment", strategy = "increment")
////    @GeneratedValue(generator = "increment")
////    private Integer id;
//    private String orderId;
//    private Integer restaurantId;
//    private Integer userId;
//    private String status;
//    private String date;
//    private String time;
//    private double price;
//
//    public Order() {
//    }
//
//    public Order(String orderId, Integer restaurantId, Integer userId, String status, String date, String time, double price) {
//        this.orderId = orderId;
//        this.restaurantId = restaurantId;
//        this.userId = userId;
//        this.status = status;
//        this.date = date;
//        this.time = time;
//        this.price = price;
//    }
//
//    @Override
//    public String toString() {
//        return "Order{" +
//                "orderId='" + orderId + '\'' +
//                ", restaurantId=" + restaurantId +
//                ", userId=" + userId +
//                ", status='" + status + '\'' +
//                ", date='" + date + '\'' +
//                ", time='" + time + '\'' +
//                ", price=" + price +
//                '}';
//    }
//
//    public String getOrderId() {
//        return orderId;
//    }
//
//    public void setOrderId(String orderId) {
//        this.orderId = orderId;
//    }
//
//    public Integer getRestaurantId() {
//        return restaurantId;
//    }
//
//    public void setRestaurantId(Integer restaurantId) {
//        this.restaurantId = restaurantId;
//    }
//
//    public Integer getUserId() {
//        return userId;
//    }
//
//    public void setUserId(Integer userId) {
//        this.userId = userId;
//    }
//
//    public String getStatus() {
//        return status;
//    }
//
//    public void setStatus(String status) {
//        this.status = status;
//    }
//
//    public String getDate() {
//        return date;
//    }
//
//    public void setDate(String date) {
//        this.date = date;
//    }
//
//    public String getTime() {
//        return time;
//    }
//
//    public void setTime(String time) {
//        this.time = time;
//    }
//
//    public double getPrice() {
//        return price;
//    }
//
//    public void setPrice(double price) {
//        this.price = price;
//    }
//}
