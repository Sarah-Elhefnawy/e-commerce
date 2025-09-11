import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/translateService/my-translate-service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, TranslateModule, TranslatePipe],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export class NotFound {
  public _MyTranslateService = inject(MyTranslateService)
}
