import React,{useEffect,useState} from 'react'
import useAuth from '../../../hooks/useAuth'
import useCampaign from '../../../hooks/useCampaign'
import CustomList from '../../../components/CustomList'
import { Container } from '@mui/system';

const tableKeys =[
	// {name:"_id",label:'ID', type: 'link', link: 'marketing/campaigns'},
  {name:'title',label:'Titulo',type:'linkID',link: 'marketing/campaigns'},
  {name:'store.make.name',label:'Marca',},
  {name:'store.name',label:'Agencia',},
	{name:"objetive", label:'Objetivo'},
	{name:"design.image",type:'avatar', label:'design'},
	{name:"design.exampleImage",type:'avatar', label:'example'},
  // {name:"startDate",sort:'startDate',label:'Start Date', type: 'date'},
	// {name:"endDate",sort:'endDate',label:'End Date', type: 'date'},
	{name:"budget",label:'Budget', type: 'money'},
	{name:"segmentation.name",label:'Segmentation'},
	{name:"design.name",label:'Design'},
	{name:"user.image",type:'avatar', label:'Usuario'},
  {name:"createdAt",label:'Created At', type: 'date'},
];

const index = () => {
  const {user} = useAuth();
  const { getCampaigns: getData, campaigns: data, count } = useCampaign();

  const [userParams,setUserParams]= useState(false);

  useEffect(() => {
    if(!user || !user.role || !user._id)return;
      if(['rockstar'].includes(user.role))return setUserParams({})
      if(['designer','marketing digital','admin'].includes(user.role))return setUserParams({['store__id']:{value:user.stores.map(store=>store._id._id)}})
      if(['admin marketing digital'].includes(user.role))return setUserParams({['store_make__id']:{value:user.makes.map(make=>make._id)}})
      // default params 
      setUserParams({['user__id']:{value:user._id}})

    // eslint-disable-next-line
  }, [user]);

  
  return (
    <Container maxWidth="lg">
          <CustomList {...{ tableKeys, count, data, getData, userParams }} />
    </Container>
  );
}

export default index