export default function BlogSection() {
    return (
        <div className="container-fluid overflow-hidden min-vh-100" id="blog-content">
            <div className="container" id="blog-wrapper">
                <h3>Blog</h3>
                <div className="accordion" id="blog">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                            >
                                Difference between SQL and NoSQL
                            </button>
                        </h2>
                        <div
                            id="collapseOne"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingOne"
                            data-bs-parent="#blog"
                        >
                            <div className="accordion-body">
                                SQL is the programming language used to interface with relational
                                databases. (Relational databases model data as records in rows and
                                tables with logical links between them). NoSQL is a class of DBMs
                                that are non-relational and generally do not use SQL.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                            >
                                What is JWT, and how does it work?
                            </button>
                        </h2>
                        <div
                            id="collapseTwo"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#blog"
                        >
                            <div className="accordion-body">
                                JSON Web Token (JWT) is an open standard (RFC 7519) for securely
                                transmitting information between parties as JSON object. It is
                                compact, readable and digitally signed using a private key/ or a
                                public key pair by the Identity Provider(IdP). So the integrity and
                                authenticity of the token can be verified by other parties involved.
                                The purpose of using JWT is not to hide data but to ensure the
                                authenticity of the data. JWT is signed and encoded, not encrypted.
                                JWT is a token based stateless authentication mechanism. Since it is
                                a client-side based stateless session, server doesn&apos;t have to
                                completely rely on a datastore(database) to save session
                                information.
                                <br />
                                <strong>How it works?</strong>
                                <br />
                                Basically the identity provider(IdP) generates a JWT certifying user
                                identity and Resource server decodes and verifies the authenticity
                                of the token using secret salt/public key.
                                <ul>
                                    <li>
                                        User sign-in using username and password or google/facebook.
                                    </li>
                                    <li>
                                        Authentication server verifies the credentials and issues a
                                        jwt signed using either a secret salt or a private key
                                    </li>
                                    <li>
                                        User&apos;s Client uses the JWT to access protected
                                        resources by passing the JWT in HTTP Authorization header.
                                    </li>
                                    <li>
                                        Resource server then verifies the authenticity of the token
                                        using the secret salt/ public key.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                            >
                                What is the difference between javascript and NodeJS?
                            </button>
                        </h2>
                        <div
                            id="collapseThree"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingThree"
                            data-bs-parent="#blog"
                        >
                            <div className="accordion-body">
                                JavaScript is a simple programming language that can be used with
                                any browser that has the JavaScript Engine installed. Node.js, on
                                the other hand, is an interpreter or execution environment for the
                                JavaScript programming language. It requires libraries that can be
                                conveniently accessed from JavaScript programming to be more
                                helpful.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingFour">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseFour"
                                aria-expanded="false"
                                aria-controls="collapseFour"
                            >
                                How does NodeJS handle multiple requests at the same time?
                            </button>
                        </h2>
                        <div
                            id="collapseFour"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingFour"
                            data-bs-parent="#blog"
                        >
                            <div className="accordion-body">
                                When you say Node.JS can handle 10,000 concurrent requests they are
                                essentially non-blocking requests i.e. these requests are majorly
                                pertaining to database query. Internally, event loop of Node.JS is
                                handling a thread pool, where each thread handles a non-blocking
                                request and event loop continues to listen to more request after
                                delegating work to one of the thread of the thread pool. When one of
                                the thread completes the work, it send a signal to the event loop
                                that it has finished aka callback. Event loop then process this
                                callback and send the response back.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
