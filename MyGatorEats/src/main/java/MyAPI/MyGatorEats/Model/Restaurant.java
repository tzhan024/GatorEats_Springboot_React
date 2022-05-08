package MyAPI.MyGatorEats.Model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Id;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

@Entity
@Table(name = "restaurants")
public class Restaurant {
    @Id
    @GenericGenerator(name = "increment", strategy = "increment")
    @GeneratedValue(generator = "increment")
    private Integer id;
    private String name;
    private String email;
    private String password;
    private String address;
    private String state;
    private String zipcode;
    private String image;

    public Restaurant() {
    }

    public Restaurant(String name, String email, String password, String address, String state, String zipcide) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.address = address;
        this.state = state;
        this.zipcode = zipcode;
    }

    @Override
    public String toString() {
        return "Restaurant{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", address='" + address + '\'' +
                ", state='" + state + '\'' +
                ", zipcode='" + zipcode + '\'' +
                ", image='" + image + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

//    public void setId(Long id) {
//        this.id = id;
//    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipcide() {
        return zipcode;
    }

    public void setZipcide(String zipcide) {
        this.zipcode = zipcide;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
