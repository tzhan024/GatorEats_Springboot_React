package MyAPI.MyGatorEats.Model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Id;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

@Entity
@Table(name = "payments")
public class Payment {
    @Id
    @GenericGenerator(name = "increment", strategy = "increment")
    @GeneratedValue(generator = "increment")
    private Integer id;
    private Integer userid;
    private String name;
    private String number;
    private String expdate;
    private String scode;


    public Payment(){}

    public Payment(Integer userid, String name, String number, String expdate, String scode) {
        this.userid = userid;
        this.name = name;
        this.number = number;
        this.expdate = expdate;
        this.scode = scode;
    }

    @Override
    public String toString() {
        return "Payment{" +
                "id=" + id +
                ", userid=" + userid +
                ", name='" + name + '\'' +
                ", number='" + number + '\'' +
                ", expDate='" + expdate + '\'' +
                ", scode='" + scode + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getExpdate() {
        return expdate;
    }

    public void setExpdate(String expdate) {
        this.expdate = expdate;
    }

    public String getScode() {
        return scode;
    }

    public void setScode(String scode) {
        this.scode = scode;
    }
}
