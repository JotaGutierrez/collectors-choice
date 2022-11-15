import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";

interface Props {
    active,
    realm,
    activateRealm,
    activateRealmConfig,
    realmKey,
}

const RealmSelector = ({active, realm, activateRealm, activateRealmConfig, realmKey}: Props) =>
  <div key={realmKey}>
    <div>
        <div>
            <a onClick={event => {event.preventDefault(); activateRealm(realm.name);}}>{realm.name}</a>
        </div>
        <div>
            <a onClick={event => {event.preventDefault(); activateRealmConfig(realm.name); }}>
              <IconButton>
                <Edit />
              </IconButton>
            </a>
        </div>
    </div>
  </div>

export default RealmSelector;
