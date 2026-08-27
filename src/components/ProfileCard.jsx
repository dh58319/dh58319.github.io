import SocialLinks from './SocialLinks.jsx'
import { profile } from '../data.js'
import profilePhoto from '../assets/profile.jpg'

export default function ProfileCard() {
  return (
    <div className="profile-card">
      <img className="profile-card-photo" src={profilePhoto} alt={profile.name} />
      <p className="profile-name">{profile.name}</p>
      <p className="title">{profile.title}</p>
      <p className="affiliation">{profile.affiliation}</p>
      {profile.advisor && <p className="advisor">{profile.advisor}</p>}
      <SocialLinks />
    </div>
  )
}
