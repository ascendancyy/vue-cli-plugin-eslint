module.exports = {
  root: true,
  extends: [
  <%_ configs.forEach(function (config) { _%>
    '<%- config %>',
  <%_ }); _%>
  ],
};
