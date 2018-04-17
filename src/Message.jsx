export default function Message ({message: {
  content: {text},
  username: {username}}}) {
    return (
    <article className="message">
      <div><span>{username}</span><span>{text}</span></div>
    </article>);
}
