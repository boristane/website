const app = new Vue({
    el: '#app',
    data: {
        projects: [
            {
                title: 'queend',
                url: 'https://boristane.github.io/queend/',
                github: 'https://boristane.github.io/queend/',
                description: `
                    <p>
                        This project originates from my interest in meteorological data. I figured I could get the wind data at meteorological stations across Britain from the <a href="https://www.metoffice.gov.uk/datapoint">Met Office</a> and display it on a map.
                    </p>
                    <p>
                        As I am using a flat map (just an image), I had to use a cartesian coordinate system, whilst the raw data was provided in lat/lon coordinates. I used the <a href="https://github.com/chrisveness/geodesy">geodesy</a> library to do the conversion to the <a href="https://www.ordnancesurvey.co.uk/resources/maps-and-geographic-resources/the-national-grid.html">National Grid</a> system et voila !
                    </p>
                    <p>
                        I later decided to perform interpolation of the wind data rather than display individual met stations. My research led me to <a href="https://en.wikipedia.org/wiki/Kriging">Kriging Interpolation</a> and the <a href="http://oeo4b.github.io/">kriging.js</a> library.
                    </p>
                    <p>
                        The final step was serving the data from a web-server as the raw data is provided through the http protocol and <a href="https://pages.github.com/">GitHub Pages</a> where the project is hosted does not allow reading data from insecure endpoints.
                    </p>
                `,
                image: '../img/projects/queend.png',
                stack: [
                    'Javascript',
                    'Node.js',
                    'Express.js',
                ],
            },
        ],
    },
});
