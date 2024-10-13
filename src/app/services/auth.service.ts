import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import * as mssql from 'mssql'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private config = {
    user: 'your_username',
    password: 'your_password',
    server: 'your_server',
    database: 'your_database',
    options: {
      encrypt: true,
      trustServerCertificate: false
    }
  }

  login(username: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      mssql.connect(this.config).then(() => {
        const request = new mssql.Request()
        request.input('username', mssql.VarChar, username)
        request.input('password', mssql.VarChar, password)
        request.query('SELECT * FROM Users WHERE Username = @username AND Password = @password')
          .then((result) => {
            if (result.recordset.length > 0) {
              observer.next(true)
            } else {
              observer.next(false)
            }
            observer.complete()
          })
          .catch((err) => {
            console.error('SQL error', err)
            observer.error(err)
          })
      }).catch((err) => {
        console.error('Connection error', err)
        observer.error(err)
      })
    })
  }
}