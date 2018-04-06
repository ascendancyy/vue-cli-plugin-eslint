module.exports = {
  root: true,
  extends: [
    <% configs.forEach(function (config) { _%>
      '<%- config %>',
    <% }); %>
  ],
};
