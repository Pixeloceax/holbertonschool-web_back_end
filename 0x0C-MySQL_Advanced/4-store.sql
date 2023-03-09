-- Name: 4-store.sql
CREATE OR REPLACE TRIGGER Mytrigger
BEFORE INSERT OR UPDATE ON items
FOR EACH ROW
EGIN
  UPDATE products
       SET quantity = quantity-New.quantity
        WHERE product_code=New.product_code;
END;