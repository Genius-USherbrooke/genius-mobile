# Genius
### Expo
1. Install CLI `npm install expo-cli --global` 
2. Start `expo start`
3. Open Expo Client on your device and scan the QR code printed

### API Details
<table>
	<tbody>
		<tr>
			<td>Host</td>
			<td>https://www.gel.usherbrooke.ca/grille-notes/api</td>
		</tr>
	</tbody>
</table>

### Required Headers
<table>
	<thead>
		<tr>
			<th>Header</th>
			<th>Example</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Cookie</td>
			<td>JSESSIONID=Hee9NOsSC2jVhq0FaQ-EWdnTjkScQtg485a9TtCV.apollon2013;</td>
		</tr>	
	</tbody>
</table>

### Known Endpoints
Note: All endpoints are concatenated to the host url

<table>
   <thead>
      <tr>
         <th>Endpoint</th>
         <th>Purpose</th>
         <th>Params?</th>
         <th>Method</th>
         <th>Response</th>
      </tr>
   </thead>
   <tbody>
    <tr>
         <td>/auth/session</td>
         <td></td>
         <td></td>
         <td>GET</td>
         <td>{user: {cip: "canp2403", email: "Pascal.Canuel@USherbrooke.ca", fullName: "Pascal Canuel"},…}</td>
      </tr>
      <tr>
         <td>/trimester</td>
         <td></td>
         <td></td>
         <td>GET</td>
         <td>[{id: "H20", label: "Hiver 2020", current: false,…},…]</td>
      </tr>
      <tr>
         <td>/grid/results</td>
         <td></td>
         <td>{'trimester'=A19, 'profil'=s1gei}</td>
         <td>GET</td>
         <td>{evaluations: [{score: 79.2, total: 80, avg: null, stddev: null, median: null, id: 12401,…},…],…}</td>
      </tr>
   </tbody>
</table>
