import '../../Assets/style.css';
import Header from '../pages/homepage/parts/Header';
import Footer from '../pages/homepage/parts/Footer';


const Contact = () => {

    return (
        <div>
            <Header />
            <div>
                {/* ##### Contact Information Area Start ##### */}
                <div className="contact-information-area section-padding-80">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="logo mb-80">
                                    <img src="img/core-img/logo.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {/* Contact Text */}
                            <div className="col-12 col-lg-5">
                                <div className="contact-text">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec varius dui.
                                        Suspendisse potenti. Vestibulum ac pellentesque tortor. Aenean congue sed metus in iaculis.
                                        Cras a tortor enim. Phasellus posuere vestibulum ipsum, eget lobortis purus.</p>
                                    <p>Orci varius natoque penatibus et magnis dis ac pellentesque tortor. Aenean congue parturient
                                        montes, nascetur ridiculus mus.</p>
                                </div>
                            </div>
                            <div className="col-12 col-lg-3">
                                {/* Single Contact Information */}
                                <div className="single-contact-information mb-30">
                                    <h6>Address:</h6>
                                    <p>99 Tô Hiến Thành<br />Sơn Trà, Đà Nẵng</p>
                                </div>
                                {/* Single Contact Information */}
                                <div className="single-contact-information mb-30">
                                    <h6>Phone:</h6>
                                    <p>+53 345 7953 32453 <br />+53 345 7557 822112</p>
                                </div>
                                {/* Single Contact Information */}
                                <div className="single-contact-information mb-30">
                                    <h6>Email:</h6>
                                    <p>info.vietnam@passerellesnumeriques.org</p>
                                </div>
                            </div>
                            {/* Newsletter Area */}
                            <div className="col-12 col-lg-4">
                                <div className="newsletter-form bg-img bg-overlay" style={{ backgroundImage: 'url(img/bg-img/bg1.jpg)' }}>
                                    <form action="#" method="post">
                                        <input type="email" name="email" placeholder="Subscribe to newsletter" />
                                        <button type="submit" className="btn delicious-btn w-100">Subscribe</button>
                                    </form>
                                    <p>Fusce nec ante vitae lacus aliquet vulputate. Donec sceleri sque accumsan molestie.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ##### Contact Information Area End ##### */}
                {/* ##### Contact Form Area Start ##### */}
                <div className="contact-area section-padding-0-80">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="section-heading">
                                    <h3>Get In Touch</h3>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="contact-form-area">
                                    <form action="#" method="post">
                                        <div className="row">
                                            <div className="col-12 col-lg-6">
                                                <input type="text" className="form-control" id="name" placeholder="Name" />
                                            </div>
                                            <div className="col-12 col-lg-6">
                                                <input type="email" className="form-control" id="email" placeholder="E-mail" />
                                            </div>
                                            <div className="col-12">
                                                <input type="text" className="form-control" id="subject" placeholder="Subject" />
                                            </div>
                                            <div className="col-12">
                                                <textarea name="message" className="form-control" id="message" cols={30} rows={10} placeholder="Message" defaultValue={""} />
                                            </div>
                                            <div className="col-12 text-center">
                                                <button className="btn delicious-btn mt-30" type="submit">Send</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ##### Contact Form Area End ##### */}
                {/* ##### Google Maps ##### */}
                <div className="map-area">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.1103361795745!2d108.2410770732341!3d16.059763189695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142177f2ced6d8b%3A0xeac35f2960ca74a4!2zOTkgVMO0IEhp4bq_biBUaMOgbmgsIFBoxrDhu5tjIE3hu7ksIFPGoW4gVHLDoCwgxJDDoCBO4bq1bmcgNTUwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1686193855923!5m2!1svi!2s" width="100%" height={500} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default Contact;