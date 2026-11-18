const members = [
  {
    name: 'Usman Shareef',
    role: 'CEO',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Ahsan Maqsood Gheba',
    role: '',
    photo: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    name: 'Huzaifa Farooq',
    role: '',
    photo: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    name: 'Ahsan Seemab',
    role: '',
    photo: 'https://randomuser.me/api/portraits/men/85.jpg',
  },
]

export function TeamMembers() {
  return (
    <section className="team-members section-pad" id="people">
      <div className="page-shell">
        <div className="team-members__heading">
          <span className="eyebrow">
            <span className="eyebrow__dot" /> THE PEOPLE BEHIND HSB
          </span>
          <h2>Meet our <em>team.</em></h2>
          <p>Meet the people behind HSB Associates & Builders.</p>
        </div>

        <div className="team-members__grid">
          {members.map((member, index) => (
            <article className="team-member" key={member.name}>
              <div className="team-member__photo">
                <img
                  src={member.photo}
                  alt={`Temporary stock photo placeholder for ${member.name}`}
                  loading="lazy"
                />
                <span className="team-member__number">
                  0{index + 1}
                </span>
                <span className="team-member__placeholder">
                  TEMPORARY PHOTO
                </span>
              </div>

              <div className="team-member__info">
                <h3>{member.name}</h3>
                {member.role && (
                  <span className="team-member__role">{member.role}</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
