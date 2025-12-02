import React, { forwardRef } from "react";

const Contact = forwardRef((props, ref) => {
  const light = {
    padding: 60,
    textAlign: "center",
  };

  return (
    <section ref={ref} style={light}>
      <h1>Contact</h1>
      <p>Email: info@btstech.com</p>
      <p>Phone: +383 44 000 000</p>
    </section>
  );
});

export default Contact;
