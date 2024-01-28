// tenantMiddleware.js

const setTenantIdMiddleware = (req, res, next) => {
  // logic to retrieve the tenantId from the user's session or request context
  const tenantId = req.session.tenantId || null;

  // Set the tenantId in the request context
  req.tenantId = tenantId;

  next();
};

module.exports = setTenantIdMiddleware;
