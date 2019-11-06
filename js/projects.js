/* eslint-disable func-names */
/* eslint-disable object-shorthand */
const app = new Vue({
    el: "#app",
    data: {
        projects: undefined
    },
    created: function() {
        const url = "https://glddw4ljnl.execute-api.eu-west-2.amazonaws.com/prod/projects";
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.projects = data.projects.reverse();
            });
    }
});
