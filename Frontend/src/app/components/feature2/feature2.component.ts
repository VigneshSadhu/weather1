import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClient
import { AirPollutionService } from '../air-pollution.service';
import { Observable } from 'rxjs'; // Import Observable

export interface PRData {
  Eindex: number;
}

@Component({
  selector: 'app-air-pollution',
  templateUrl: './air-pollution.component.html',
  styleUrls: ['./air-pollution.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class AirPollutionComponent implements OnInit {

  city: string = '';
  pollutionData: PRData | null = null; // Use the interface and initialize to null
  errorMessage: string | null = null; // For error handling

  constructor(private airPollutionService: AirPollutionService, private http: HttpClient) { } // Inject HttpClient

  ngOnInit(): void {
    // You can initialize anything here if needed, but no need to throw an error.
  }

  getAirPollution() { // No need to pass city as argument, use this.city
    if (!this.city) {
      this.errorMessage = "Please enter a city name.";
      return; // Stop execution if city is empty
    }

    const apiUrl = `http://localhost:3000/air-pollution/${this.city}`; // Corrected URL

    this.http.get<PRData>(apiUrl).subscribe({ // Use object for subscribe
      next: (data) => {
        console.log('Pollution data:', data);
        this.pollutionData = data;
        this.errorMessage = null; // Clear any previous errors
      },
      error: (error) => {
        console.error('Error fetching pollution:', error);
        this.pollutionData = null; // Clear any previous data
        this.errorMessage = error.error.error || "Error fetching data"; // Display error or default message
      }
    });
  }
}
