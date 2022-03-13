function createResponse(res, data = {}, status = 200) {
  const success = status == 200;
  res.status(status);
  return { success, status, data };
}

exports.createResponse = createResponse;
