package MyAPI.MyGatorEats.Model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "carts")
public class Cart {
    @Id
    @GenericGenerator(name = "increment", strategy = "increment")
    @GeneratedValue(generator = "increment")
    private Integer id;
    private Integer restaurant;
    private Integer userid;
    private Integer food;
    private int qty;

    public Cart()
    {

    }

//    public Cart(Integer restaurant, Integer user, Integer food, int qty) {
//        this.restaurant = restaurant;
//        this.user = user;
//        this.food = food;
//        this.qty = qty;
//    }

    @Override
    public String toString() {
        return "Cart{" +
                "id=" + id +
                ", restaurant=" + restaurant +
                ", userid=" + userid +
                ", food=" + food +
                ", qty=" + qty +
                '}';
    }

    public Integer getId() {
        return id;
    }

//    public void setId(Integer id) {
//        this.id = id;
//    }

    public Integer getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Integer restaurant) {
        this.restaurant = restaurant;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public Integer getFood() {
        return food;
    }

    public void setFood(Integer food) {
        this.food = food;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }
}
