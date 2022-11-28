export default function BlogSection() {
    return (
        <div className="container-fluid overflow-hidden min-vh-100 pb-5" id="blog-content">
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
                                What are the different ways to manage a state in a React
                                application?
                            </button>
                        </h2>
                        <div
                            id="collapseOne"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingOne"
                            data-bs-parent="#blog"
                        >
                            <div className="accordion-body">
                                The Four Kinds of React State to Manage When we talk about state in
                                our applications, it&apos;s important to be clear about what types
                                of state actually matter. There are four main types of state you
                                need to properly manage in your React apps: Lets cover each of these
                                in detail:
                                <ul>
                                    <li>Local state</li>
                                    <li>Global state</li>
                                    <li>Server state</li>
                                    <li>URL state</li>
                                </ul>
                                Local (UI) state Local state is data we manage in one or another
                                component. Local state is most often managed in React using the
                                useState hook. For example, local state would be needed to show or
                                hide a modal component or to track values for a form component, such
                                as form submission, when the form is disabled and the values of a
                                form&apos;s inputs. Global (UI) state Global state is data we manage
                                across multiple components. Global state is necessary when we want
                                to get and update data anywhere in our app, or in multiple
                                components at least. A common example of global state is
                                authenticated user state. If a user is logged into our app, it is
                                necessary to get and change their data throughout our application.
                                Sometimes state we think should be local might become global. Server
                                state Data that comes from an external server that must be
                                integrated with our UI state. Server state is a simple concept, but
                                can be hard to manage alongside all of our local and global UI
                                state. There are several pieces of state that must be managed every
                                time you fetch or update data from an external server, including
                                loading and error state. Fortunately there are tools such as SWR and
                                React Query that make managing server state much easier. URL state
                                Data that exists on our URLs, including the pathname and query
                                parameters. URL state is often missing as a category of state, but
                                it is an important one. In many cases, a lot of major parts of our
                                application rely upon accessing URL state. Try to imagine building a
                                blog without being able to fetch a post based off of its slug or id
                                that is located in the URL! There are undoubtedly more pieces of
                                state that we could identify, but these are the major categories
                                worth focusing on for most applications you build.
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
                                How does prototypical inheritance work?
                            </button>
                        </h2>
                        <div
                            id="collapseTwo"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#blog"
                        >
                            <div className="accordion-body">
                                The Prototypal Inheritance is a feature in javascript used to add
                                methods and properties in objects. It is a method by which an object
                                can inherit the properties and methods of another object.
                                Traditionally, in order to get and set the [[Prototype]] of an
                                object, we use Object. getPrototypeOf and Object.
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
                                What is a unit test? Why should we write unit tests?
                            </button>
                        </h2>
                        <div
                            id="collapseThree"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingThree"
                            data-bs-parent="#blog"
                        >
                            <div className="accordion-body">
                                The main objective of unit testing is to isolate written code to
                                test and determine if it works as intended. Unit testing is an
                                important step in the development process, because if done
                                correctly, it can help detect early flaws in code which may be more
                                difficult to find in later testing stages.
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
                                React vs. Angular vs. Vue?
                            </button>
                        </h2>
                        <div
                            id="collapseFour"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingFour"
                            data-bs-parent="#blog"
                        >
                            <div className="accordion-body">
                                <strong>Angular vs React</strong>
                                <br />
                                If the choice your&apos;e making is based on Angular vs React alone,
                                then you&apos;ll simply need to consider the pros and cons discussed
                                for those libraries in this post. But overall, keep in mind that
                                both libraries can be used for mobile and web apps, while Angular is
                                generally better for more complex apps that are enterprise-ready.
                                React often requires extra modules and components, which keeps the
                                core library small, but means theres extra work involved when
                                incorporating outside tools. Angular, on the other hand, is more of
                                a full-fledged solution that doesnt require extras like React often
                                does, though it does have a steeper learning curve for its core
                                compared to React. React is more suitable for intermediate to
                                advanced JavaScript developers who are familiar with concepts from
                                ES6 and up, while Angular favors those same developers who are also
                                familiar with TypeScript.
                                <br />
                                <strong>React vs Vue</strong>
                                <br />
                                The choice between React vs Vue is often debated and it&apos;s not
                                an easy one. Vue has a vibrant and ever-growing community and has
                                taken over popularity vs. React in many respects. React developers
                                are still churning out lots of new components and extras, so
                                there&apos;s no sign that React is on the decline either. Vue is
                                generally more suited to smaller, less complex apps and is easier to
                                learn from scratch compared to React. Vue can be easier to integrate
                                into new or existing projects and many feel its use of HTML
                                templates along with JSX is an advantage. Overall, Vue might be the
                                best choice if you&apos;re a newer developer and not as familiar
                                with advanced JavaScript concepts, while React is quite well suited
                                for experienced programmers and developers who have worked with
                                object-oriented JavaScript, functional JavaScript, and similar
                                concepts.
                                <br />
                                <strong>Angular vs Vue</strong>
                                <br />
                                In most cases, you probably wouldn&apos;t be deciding between only
                                Angular and Vue. They are vastly different libraries with very
                                different feature sets and learning curves. Vue is the clear choice
                                for less experienced developers, and Angular would be preferred for
                                those working on larger apps. A large library like Angular would
                                require more diligence in keeping up with what&apos;s new, while Vue
                                would be less demanding in this regard and the fact that the two
                                most recent major releases of Vue are in separate repositories
                                helps. It should also be noted that Vue was created by a developer
                                who formerly worked on Angular for Google, so that&apos;s another
                                thing to keep in mind, though that wouldn&apos;t have a huge impact
                                on your decision.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
