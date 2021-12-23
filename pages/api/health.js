export default async function health(req, res) {
  return res.status(200).send('API server for `my-blog` is healthy!')
}
