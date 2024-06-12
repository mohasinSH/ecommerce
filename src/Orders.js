import React, { useEffect, useState } from 'react'
import { getFirestore, collection, query, orderBy, onSnapshot, doc } from "firebase/firestore"
import { db } from './firebase'
import { useStateValue } from './StateProvider'
import Order from './Order'
const Orders = () => {
  const [orders,setOrders] = useState()
 const [{user},dispatch] = useStateValue()
 useEffect(() => {
  if (user) {
    const userDocRef = doc(db, 'users', user.uid);
    const ordersCollectionRef = collection(userDocRef, 'orders');
    const ordersQuery = query(ordersCollectionRef, orderBy('created', 'desc'));

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      setOrders(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      })));
    });

    // Cleanup function to unsubscribe from the snapshot listener when the component unmounts
    return () => unsubscribe();
  } else {
    setOrders([]);
  }
}, [user, db]);

  return (
    <div className='orders'>
            <h1>Your Orders</h1>

            <div className='orders__order'>
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
  )
}

export default Orders
