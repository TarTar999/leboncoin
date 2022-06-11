import { FC, useEffect } from 'react'
import Image from 'next/image'
import profile from '../assets/profile.jpeg'
import { DiscutionModel } from '../models/Discution'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Discution: FC<{ discution: DiscutionModel; tabIndex: number }> = ({
  discution,
  tabIndex,
}) => {
  const router = useRouter()
  useEffect(() => {
    document.addEventListener(
      'keydown',
      function (event) {
        if (event.key === 'Enter') {
          router.push({
            pathname: '/conversation',
            query: { discution: discution.id, reciver: discution.recipientId },
          })
        }
      },
      false,
    )
  })
  return (
    <div tabIndex={tabIndex}>
      <Link
        href={{
          pathname: '/conversation',
          query: { discution: discution.id, reciver: discution.recipientId },
        }}
      >
        <div className="discution">
          <div className="col-3 col-lg-1 avatard">
            <Image
              src={profile}
              alt={`profile-user${discution.recipientId}`}
              layout={'intrinsic'}
              className="contact-img"
            />
          </div>
          <div className="discution-body col-9 col-lg-11">
            <div className="col-12 h-50">{discution.recipientNickname}</div>
            <div className="col-12 h-50">
              {new Date(discution.lastMessageTimestamp).toDateString()}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Discution
