package MyAPI.MyGatorEats.Model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Id;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import java.util.Map;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GenericGenerator(name = "increment", strategy = "increment")
    @GeneratedValue(generator = "increment")
    private Integer id;
    private Integer restaurantid;
    private Integer userid;
    private String ordernumber;
    private String status;
    private String date;
    private String time;
    private double price;
    private String name;
    private String address;
    private String city;
    private String state;
    private String zipcode;
    private String holder;
    private String number;
    private String exp;
    private String cvv;

    public Order() {
    }

    public Integer getId() {
        return id;
    }

//    public void setId(Integer id) {
//        this.id = id;
//    }



    public Integer getRestaurantid() {
        return restaurantid;
    }

    public void setRestaurantid(Integer restaurantid) {
        this.restaurantid = restaurantid;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getOrdernumber() {
        return ordernumber;
    }

    public void setOrdernumber(String ordernumber) {
        this.ordernumber = ordernumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public String getHolder() {
        return holder;
    }

    public void setHolder(String holder) {
        this.holder = holder;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getExp() {
        return exp;
    }

    public void setExp(String exp) {
        this.exp = exp;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", restaurantId=" + restaurantid +
                ", userId=" + userid +
                ", orderNumber='" + ordernumber + '\'' +
                ", status='" + status + '\'' +
                ", date='" + date + '\'' +
                ", time='" + time + '\'' +
                ", price=" + price +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", zipcode='" + zipcode + '\'' +
                ", holder='" + holder + '\'' +
                ", number='" + number + '\'' +
                ", exp='" + exp + '\'' +
                ", cvv='" + cvv + '\'' +
                '}';
    }


}
